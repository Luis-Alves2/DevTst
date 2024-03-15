import { Module } from '@nestjs/common';
import { TransactionController } from './controllers/app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './services/app.service';

import { Transaction } from './entities/app.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'API_GATEWAY_CONSUME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'api_to_transactions_queue',
        },
      },
      {
        name: 'API_GATEWAY_EMIT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'transactions_to_api_queue',
        },
      }   
    ]),
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