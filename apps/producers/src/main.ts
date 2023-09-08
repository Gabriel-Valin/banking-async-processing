import { NestFactory } from '@nestjs/core';
import { ProducersModule } from './producers.module';

async function bootstrap() {
  const app = await NestFactory.create(ProducersModule);
  await app.listen(3000);
}
bootstrap();
