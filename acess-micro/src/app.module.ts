import { Module } from '@nestjs/common';
import { AppController } from  './controllers/app.controller';
import { AppService } from './services/app.service';

import { ClientsModule, Transport } from '@nestjs/microservices';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestFactory } from '@nestjs/core';

const config = new DocumentBuilder()
  .setTitle('User API')
  .setDescription('API documentation for user management')
  .setVersion('1.0')
  .addTag('users')
  .build();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICRO-CLIENT-SEND',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'api_to_client_queue',
        },
      },
      {
        name: 'MICRO-TRANSACTION-SEND',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'api_to_transactions_queue',
        },
      },
      {
        name: 'MICRO-TRANSACTION-CONSUME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'transactions_to_api_queue',
        },
      },
      {
        name: 'MICRO-CLIENT-CONSUME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'client_to_api_queue',
        },
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}