import { NestFactory } from '@nestjs/core';
import { ClientModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ClientModule);
  await app.listen(3001);
}
bootstrap();
