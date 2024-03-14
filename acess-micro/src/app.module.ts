import { Module } from '@nestjs/common';
import { AppController } from  './controllers/app.controller';
import { AppService } from './services/app.service';

import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICRO-CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:3001'],
          queue: 'nestjs_queue_client',
        },
      },
      {
        name: 'MICRO-TRANSACTION',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:3001'],
          queue: 'nestjs_queue_transaction',
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}