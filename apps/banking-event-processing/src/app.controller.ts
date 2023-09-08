import { Controller, Get } from '@nestjs/common';
import { ProducerMessage } from 'apps/producers/src/producers.service';
import { CorrelationIdService } from 'correlationID/correlation-id';
import { v4 as uuid } from 'uuid'

@Controller()
export class AppController {
  constructor(
    private readonly producerMessage: ProducerMessage,
    private readonly correlationID: CorrelationIdService
  ) { }

  @Get('/produce')
  async getHello(): Promise<any> {
    const initialCID = uuid()
    this.correlationID.start(initialCID)
    const produceMessage = await this.producerMessage.sendMessage({
      cid: initialCID,
      event: 'CREDIT_ANALYZE',
      data: {
        name: 'John Doe',
        yo: '30/07/1999',
        document: '49129401881',
        motherName: 'Jane Doe',
        email: 'johndoe@gmail.com',
        contact: '11996920892'
      }
    })
    return produceMessage
  }
}
