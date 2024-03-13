import { Module } from '@nestjs/common';
import { ClientController } from './app.controller';
import { ClientService } from './app.service';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}