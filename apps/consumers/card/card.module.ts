import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { SQSClient } from '@aws-sdk/client-sqs'
import * as AWS from 'aws-sdk'
import { CreateCardHandler } from './handlers/create-card.handler';
import { ConfigModule } from '@nestjs/config';

AWS.config.update({ region: "sa-east-1", credentials: new AWS.Credentials("gabriel", "gabriel") });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local']
    }),
    SqsModule.register({
      consumers: [
        {
          name: process.env.CARD_QUEUE,
          queueUrl: process.env.CARD_QUEUE_URL,
          region: process.env.AWS_REGION,
          sqs: new SQSClient({
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
            region: process.env.AWS_REGION,
            endpoint: 'http://127.0.0.1:4566'
          })
        },
      ],
    })
  ],
  controllers: [],
  providers: [CreateCardHandler],
  exports: [CreateCardHandler]
})
export class CardConsumer { }
