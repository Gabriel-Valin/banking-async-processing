import { Message } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class CreateCardHandler {
  private logger = new Logger()

  @SqsMessageHandler('card-queue', false)
  public async handleMessage(message: Message) {
    if (message.Body) {
      const obj = JSON.parse(message.Body);
      this.logger.log("MESSAGE PROCESSING STARTING", { ...obj.message })

      // processar mensagem 
      await new Promise(res => {
        setTimeout(() => {
          res(true)
        }, 5000)
      })
      this.logger.log('Message has been processed')
    }
  }

  @SqsConsumerEventHandler('card-queue', 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    this.logger.error(error, message)
  }
}
