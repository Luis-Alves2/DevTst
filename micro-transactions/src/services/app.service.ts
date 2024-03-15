import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/app.entity';
import { firstValueFrom } from 'rxjs';

import { Transport, ClientProxy, ClientProxyFactory, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class TransactionService {
  private clientProxy: ClientProxy;

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'], // Replace with your RabbitMQ connection URL
        queue: 'transactions_to_api_queue', // Queue for Transactions to respond to API Gateway
      },
    });
  }

  async getTransactionById(transactionId: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({ where: { id: transactionId } });
    if (!transaction) {
      throw new NotFoundException('Transaction not found.');
    }
    return transaction;
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    const userTransactions = await this.transactionRepository.find({ where: { senderUserId: userId } });
    return userTransactions;
  }

  async initiateTransfer(senderUserId: number, receiverUserId: number, amount: number, description: string): Promise<void> {
    const transaction = new Transaction();
    transaction.senderUserId = senderUserId;
    transaction.receiverUserId = receiverUserId;
    transaction.amount = amount;
    transaction.description = description;

    await this.transactionRepository.save(transaction);
  }

  getHello(): string {
    return 'Hello from Service Client';
  }

@MessagePattern('api_to_transactions_queue')
async handleApiToTransactionMessage(data: any): Promise<void> {
  try {
    const { action, payload } = data;

    let result;
    switch (action) {
      case 'createTransaction':
        result = await this.initiateTransfer(payload.senderUserId, payload.receiverUserId, payload.amount, payload.description);
        break;
      case 'getTransactionDetails':
        result = await this.getTransactionById(payload.transactionId);
        break;
      case 'getUserTransactions':
        result = await this.getTransactionsByUserId(payload.userId);
        break;
      default:
        throw new Error('Invalid action');
    }

    await firstValueFrom(this.clientProxy.emit('transaction_response', { action, result }));
  } catch (error) {
    console.error('Error handling API to transaction message:', error);
  }
}


}
