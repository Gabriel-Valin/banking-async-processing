import { Module } from '@nestjs/common';
import { CorrelationIdService } from './correlation-id.service';

@Module({
  providers: [CorrelationIdService],
  exports: [CorrelationIdService],
})
export class CorrelationIdModule {}
