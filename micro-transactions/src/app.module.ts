import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/app.controller';
import { TransactionService } from './services/app.service';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
