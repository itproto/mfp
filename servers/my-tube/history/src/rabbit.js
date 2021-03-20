const amqp = require('amqplib');
if (!process.env.RABBIT) {
    throw new Error("Please specify the name of the RabbitMQ host using environment variable RABBIT");
}

const RABBIT = process.env.RABBIT;

function connectRabbit() {
    console.log(`Connecting to RabbitMQ server at ${RABBIT}.`);
    return amqp.connect(RABBIT) // Connect to the RabbitMQ server.
        .then(connection => {
            console.log("Connected to RabbitMQ.");

            return connection.createChannel();
        });
}


const consumeExchangeMessages = (messageChannel, consumeViewedMessage, exchangeName = "viewed") => {
    const anonymousQuee = '';
    return messageChannel.assertExchange(exchangeName, "fanout")
        .then(() => {
            return messageChannel.assertQueue(anonymousQuee, { exclusive: true });
        })
        .then(response => {
            const queueName = response.queue;
            console.log(`Created queue ${queueName}, binding it to "viewed" exchange.`);
            return messageChannel.bindQueue(queueName, exchangeName, '')
                .then(() => {
                    return messageChannel.consume(queueName, consumeViewedMessage);
                });
        });
}

const consumeQueueMessage = (messageChannel, consumeViewedMessage, queeName = 'viewed') => {
    return messageChannel.assertQueue(queeName, {})
        .then(() => {
            console.log("Asserted that the 'viewed' queue exists.");
            return messageChannel.consume(queeName, consumeViewedMessage);
        });
}

module.exports = {
    connectRabbit,
    consumeExchangeMessages,
    consumeQueueMessage
};