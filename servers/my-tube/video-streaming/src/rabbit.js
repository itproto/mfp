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

            return connection.createChannel() // Create a RabbitMQ messaging channel.
                .then(messageChannel => {
                    return messageChannel.assertExchange("viewed", "fanout", { durable: true }) // Assert that we have a "viewed" exchange.
                        .then(() => {
                            console.log('WAE');
                            messageChannel.publish("viewed", "", Buffer.from(JSON.stringify({ videoPath: 'test' })));
                            messageChannel.sendToQueue('Hello', Buffer.from('World'));
                            return messageChannel;
                        });
                });
        });
}

module.exports = {
    connectRabbit
};