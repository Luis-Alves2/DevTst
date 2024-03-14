import { Module ,Controller} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './controllers/app.controller';
import { ClientService } from './services/app.service';

import { Client } from './entities/app.entity';

@Module({
 imports: [
  TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "gateway_connect",
    "password": "0123456789",
    "database": "database_client_test",
    "entities": ["dist/**/*.entity.js"],
    "synchronize": true
  }),
  TypeOrmModule.forFeature([Client]),
 ],
 controllers: [ClientController],
 providers: [ClientService],
})
export class ClientModule {}