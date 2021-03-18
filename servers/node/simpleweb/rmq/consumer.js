let io = require('../');

const amqp = require('amqplib');
const rabbitUrl = 'amqp://broker';

var queueName = 'updateStock';

const listen = async () => {
    let connection = await amqp.connect(rabbitUrl);
    let channel = await connection.createChannel();
    channel.assertQueue(queueName, { durable: false });
    console.log(" [*] Waiting for stockData messages in %s. To exit press CTRL+C", queueName);
    channel.consume(queueName, (data) => {
        stock = JSON.parse(data.content.toString())
        io.socket.emit("updatedStock", stock);
    });
};

listen();