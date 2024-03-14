import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from '../services/app.service' ;

import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject('MICRO-CLIENT') private readonly Serv_client: ClientProxy, @Inject('MICRO-TRANSACTION') private readonly Serv_transaction: ClientProxy) {}


  @Get()
  async getHello(): Promise<string> {
    const resultA = await firstValueFrom(this.Serv_client.send('getHello', ''));
    const resultB = await firstValueFrom(this.Serv_transaction.send('getHello', ''));
    return this.appService.getHello( resultA, resultB);
  }
}