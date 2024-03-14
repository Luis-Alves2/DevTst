import { Controller, Get } from '@nestjs/common';
import { TransactionService } from '../services/app.service';

@Controller()
export class TransactionController {
  constructor(private readonly appService: TransactionService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
