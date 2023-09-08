import { Injectable, Logger } from '@nestjs/common';
import { SNS, config, Credentials } from 'aws-sdk'

config.update({ region: "sa-east-1", credentials: new Credentials("gabriel", "gabriel") });

@Injectable()
export class ProducerMessage {
  private client: SNS
  private logger = new Logger()

  constructor() {
    this.client = new SNS({
      region: 'sa-east-1',
      endpoint: 'http://127.0.0.1:4566',
      credentials: {
        accessKeyId: 'gabriel',
        secretAccessKey: 'gabriel'
      }
    })
  }

  async sendMessage<T>(data: T) {
    const params = {
      Message: JSON.stringify(data),
      TopicArn: 'arn:aws:sns:sa-east-1:000000000000:events',
    };

    const response = await this.client.publish(params).promise();
    this.logger.log(
      `Message ${params.Message} sent to the topic ${params.TopicArn}`
    );
    this.logger.log("MessageID: " + response.MessageId);

    return {
      MessageId: response.MessageId,
    };
  }
}
