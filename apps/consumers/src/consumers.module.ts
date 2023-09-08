import { Module } from '@nestjs/common';
import { CreditAnalysisConsumer } from '../credit-analysis/credit-analysis.module';
import { CardConsumer } from '../card/card.module';
import { LimitConsumer } from '../limit/limit.module';
import { CorrelationIdService } from 'correlationID/correlation-id';

@Module({
  imports: [
    CardConsumer,
    CreditAnalysisConsumer,
    LimitConsumer
  ],
  controllers: [],
  providers: [CorrelationIdService],
})
export class ConsumersModule { }
