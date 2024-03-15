import { Injectable } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxyFactory, ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClientProxyService {
  private clientProxy: ClientProxy;
  private transactionProxy: ClientProxy;

  constructor() {
    this.clientProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'api_to_client_queue',
      },
    });
  
    this.transactionProxy = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'api_to_transactions_queue',
      },
    });
  }

  async sendToClient(requestData: any): Promise<void> {
    try {
      await firstValueFrom(this.clientProxy.emit('api_to_client_queue', requestData));
    } catch (error) {
      console.log('error sending to client service')
    }
  }

  async sendToTransaction(requestData: any): Promise<void> {
    try {
      await firstValueFrom(this.transactionProxy.emit('api_to_transactions_queue', requestData));
    } catch (error) {
        console.log('error sending to transaction service')
    }
  }
}
