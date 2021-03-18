const amqp = require('amqplib');
const rabbitUrl = 'amqp://broker';
const sendRabbitMQ = async (queueName, data) => {
    let connection = await amqp.connect(rabbitUrl);
    let channel = await connection.createChannel();
    channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(data));
    console.log(" [x] Sent %s", data);
    setTimeout(() => { connection.close(); }, 500);
}
module.exports = sendRabbitMQ;