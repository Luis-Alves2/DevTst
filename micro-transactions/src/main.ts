import { NestFactory } from '@nestjs/core';
import { TransactionModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionModule);
  await app.listen(3002);
}
bootstrap();
