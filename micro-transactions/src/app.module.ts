import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './services/app.service';

import { Transaction } from './entities/app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "gateway_connect",
      "password": "0123456789",
      "database": "database_transaction_test",
      "entities": ["dist/**/*.entity.js"],
      "synchronize": true
    }),
    TypeOrmModule.forFeature([Transaction]),
   ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}