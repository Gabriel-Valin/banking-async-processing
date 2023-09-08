#!/bin/bash

echo "Starting setup Localstack"

aws --endpoint-url http://localhost:4566 sqs create-queue \
--queue-name credit-queue \
--region sa-east-1 

aws --endpoint-url http://localhost:4566 sqs create-queue \
--queue-name card-queue \
--region sa-east-1 

aws --endpoint-url http://localhost:4566 sqs create-queue \
--queue-name limit-queue \
--region sa-east-1 

aws --endpoint-url http://localhost:4566 sns create-topic \
--name events \
--region sa-east-1 

aws --endpoint-url http://localhost:4566 sns subscribe \
--topic-arn "arn:aws:sns:sa-east-1:000000000000:events" \
--protocol sqs \
--notification-endpoint arn:aws:sqs:sa-east-1:000000000000:credit-queue \
--region sa-east-1 

aws --endpoint-url http://localhost:4566 sns subscribe \
--topic-arn "arn:aws:sns:sa-east-1:000000000000:events" \
--protocol sqs \
--notification-endpoint arn:aws:sqs:sa-east-1:000000000000:card-queue \
--region sa-east-1 

aws --endpoint-url http://localhost:4566 sns subscribe \
--topic-arn "arn:aws:sns:sa-east-1:000000000000:events" \
--protocol sqs \
--notification-endpoint arn:aws:sqs:sa-east-1:000000000000:limit-queue \
--region sa-east-1 

echo "Finish setup Localstack"

