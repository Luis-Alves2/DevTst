import { Controller, Post, Body, HttpStatus, HttpException, Param, Get } from '@nestjs/common';
import { TransactionService } from '../services/app.service';

import { Transaction } from '../entities/app.entity';

@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  getHello(): string {
    return this.transactionService.getHello();
  }

  @Post('/api/transactions')
  async createTransfer(
    @Body() transactionData: { senderUserId: number; receiverUserId: number; amount: number; description: string },
  ): Promise<{ status: string }> {
    try {
      // Extract request data
      const { senderUserId, receiverUserId, amount, description } = transactionData;

      // Validate data (e.g., check if user IDs are valid, amount is positive, etc.)
      if (!senderUserId || !receiverUserId || !amount || amount <= 0 || !description) {
        throw new HttpException('Invalid transaction data.', HttpStatus.BAD_REQUEST);
      }

      await this.transactionService.initiateTransfer(senderUserId, receiverUserId, amount, description);

      // Return success response
      return { status: 'Transfer initiated successfully.' };
    } catch (error) {
      // Handle errors and return appropriate error response
      throw new HttpException('Failed to initiate transfer. Please try again later.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/api/transactions/:transactionId')
  async getTransactionDetails(@Param('transactionId') transactionId: number): Promise<Transaction> {
    try {

      const transaction = await this.transactionService.getTransactionById(transactionId);
      if (!transaction) {
        throw new HttpException('Transaction not found.', HttpStatus.NOT_FOUND);
      }
      return transaction;
    } catch (error) {
    
      throw new HttpException('Failed to fetch transaction details.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/api/transactions/user/:userId')
  async getUserTransactions(@Param('userId') userId: number): Promise<Transaction[]> {
    try {

      const userTransactions = await this.transactionService.getTransactionsByUserId(userId);
      return userTransactions;
    } catch (error) {

      throw new HttpException('Failed to fetch user transactions.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}