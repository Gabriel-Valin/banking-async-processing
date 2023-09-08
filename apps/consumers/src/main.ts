import { NestFactory } from '@nestjs/core';
import { ConsumersModule } from './consumers.module';

async function bootstrap() {
  const app = await NestFactory.create(ConsumersModule);
  await app.listen(9090);
}
bootstrap();
