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
                            return messageChannel;
                        });
                });
        });
}

function sendToExchange(messageChannel, videoPath, exchangeName = 'viewed') {
    console.log(`Publishing message on "viewed" exchange.${a++}`, videoPath);
    messageChannel.publish(exchangeName, "", Buffer.from(JSON.stringify({ videoPath })));
}

let a = 0;
function sendToQueue(messageChannel, videoPath, queeName = 'viewed') {
    console.log(`Publishing message on "viewed" queue.`, a++);
    const msg = { videoPath: videoPath };
    const jsonMsg = JSON.stringify(msg);
    messageChannel.publish("", queeName, Buffer.from(jsonMsg)); // Publish message to the "viewed" queue.
}


module.exports = {
    connectRabbit,
    sendToExchange,
    sendToQueue
};