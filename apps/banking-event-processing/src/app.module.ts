import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerMessage } from 'apps/producers/src/producers.service';
import { CorrelationIdService } from 'correlationID/correlation-id';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ProducerMessage, CorrelationIdService],
})
export class AppModule { }
