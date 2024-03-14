import { Module } from '@nestjs/common';
import { ClientController } from './controllers/app.controller';
import { ClientService } from './services/app.service';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}