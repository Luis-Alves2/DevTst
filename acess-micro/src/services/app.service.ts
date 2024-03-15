import { Injectable } from '@nestjs/common';
import { ClientsModule, Transport, ClientProxyFactory, MessagePattern } from '@nestjs/microservices';


@Injectable()
export class AppService {
  getHello(serviceA: string, serviceB: string): string {
    return `Service lient says: ${serviceA}, Service Transaction says: ${serviceB}`;
  }

  @MessagePattern('transactions_to_api_queue')
  async handleTransactionResponse(data: any): Promise<void> {
    console.log('Received response from Transactions:', data);
    // Process the response from Transactions service (e.g., update database)
  }

  @MessagePattern('client_to_api_queue')
  async handleClientResponse(data: any): Promise<void> {
    console.log('Received response from Client:', data);
    // Process the response from Client service (e.g., send response to client)
  }
}

