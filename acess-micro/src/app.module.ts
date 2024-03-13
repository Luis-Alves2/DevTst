import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICRO-CLIENT',
        transport: Transport.MQTT,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
      {
        name: 'MICRO-TRANSACTION',
        transport: Transport.MQTT,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}