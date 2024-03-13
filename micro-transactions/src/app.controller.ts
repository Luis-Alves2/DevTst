import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './app.service';

@Controller()
export class TransactionController {
  constructor(private readonly appService: TransactionService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
