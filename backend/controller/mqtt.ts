const amqp = require("amqplib");
// let channel: any = undefined;
async function ConnectMQtt() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("sendData", { durable: true });
    return channel;
  } catch (err) {
    throw err;
  }
}

function sendData(channel: any, data: any) {
  try {
    channel.sendToQueue("sendData", Buffer.from(JSON.stringify(data)));
  } catch (err) {
    throw err;
  }
}

export {};

module.exports = { sendData, ConnectMQtt };
