import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ClientController } from './controllers/app.controller';
import * as path from 'path'; // Import path module to handle file paths

@Module({
  imports: [
    MulterModule.register({
      dest: path.resolve(__dirname, '..', 'uploads'), // Absolute path to the uploads directory
    }),
  ],
  controllers: [ClientController],
})
export class UserModule {}
