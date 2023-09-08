import { Message } from '@aws-sdk/client-sqs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { v4 as uuid } from 'uuid'
import { CorrelationIdService } from 'correlationID/correlation-id';

@Injectable()
export class AnalyzeHandler {
  private logger = new Logger()
  private analysis: any[] = []

  constructor(
    @Inject(CorrelationIdService)
    private readonly correlationID: CorrelationIdService
  ) { }

  @SqsMessageHandler('credit-queue', false)
  public async handleMessage(message: Message) {
    if (message.Body) {
      const cid = uuid()
      this.correlationID.start(cid)

      const obj = JSON.parse(message.Body);
      this.logger.log("MESSAGE PROCESSING STARTING")
      const { event, data } = JSON.parse(obj.Message)
      const getCID = this.correlationID.getCID()

      if (event == 'CREDIT_ANALYZE') {
        await new Promise(res => {
          setTimeout(() => {
            this.analysis.push({ status: 'IN_ANALYZE', ...data, id: uuid() })
            this.logger.log({ func: 'handleMessage', cid: getCID })
            this.func1()
            this.func2()
            res(true)
          }, 5000)
        })
      }
    }
  }

  async func1() {
    const getCID = this.correlationID.getCID()
    this.logger.log({ func1: 'func1', cid: getCID })
  }

  async func2() {
    const getCID = this.correlationID.getCID()
    this.logger.log({ func2: 'func2', cid: getCID })
  }

  @SqsConsumerEventHandler('credit-queue', 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    this.logger.error(error, message)
  }
}
