import { Module } from '@nestjs/common';
import { TransactionController } from './app.controller';
import { TransactionService } from './app.service';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
