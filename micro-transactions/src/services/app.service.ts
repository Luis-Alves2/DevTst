import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/app.entity';


@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

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
}
