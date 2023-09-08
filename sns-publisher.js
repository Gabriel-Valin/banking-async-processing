const AWS = require("aws-sdk");

AWS.config.update({ region: "sa-east-1", credentials: new AWS.Credentials("gabriel", "gabriel") });

const creditAnalyzeMessage = JSON.stringify({
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

const cardMessage = JSON.stringify({
  event: 'CREATE_CARD',
  data: {
    id: 'aac629a9-ad15-40d0-84b9-edeb1a96c255',
    cardId: 'c8bd8510-f940-446a-be40-9e2cc541378f'
  }
})

const limitMessage = JSON.stringify({
  event: 'CHANGE_LIMIT',
  data: {
    cardId: 'c8bd8510-f940-446a-be40-9e2cc541378f',
    limit: 10000
  }
})

const publishMessageByEvent = (event) => {
  let message
  if (event == 'limit') {
    message = limitMessage
  }

  if (event == 'credit') {
    message = creditAnalyzeMessage
  }

  if (event == 'card') {
    message = cardMessage
  }

  const params = {
    Message: message,
    TopicArn: 'arn:aws:sns:sa-east-1:000000000000:events'
  };

  return params
}


let dynamicParams = publishMessageByEvent('credit')
const sns = new AWS.SNS({ endpoint: new AWS.Endpoint('http://127.0.0.1:4566') });

sns.publish(dynamicParams).promise().then(
  function(data) {
    console.log(`Message ${dynamicParams.Message} sent to the topic ${dynamicParams.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
      console.error(err, err.stack);
    });
