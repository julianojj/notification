import amqplib, { Connection } from 'amqplib'
import { Queue } from './Queue'

export class RabbitMQ implements Queue {
    private connection: Connection

    async connect(): Promise<void> {
        this.connection = await amqplib.connect(process.env.RABBITMQ_URL)
    }

    async consume(eventName: string, callback: any): Promise<void> {
        const channel = await this.connection.createChannel()
        channel.assertQueue(eventName)
        channel.consume(eventName, async (msg) => {
            if (msg) {
                await callback(JSON.parse(msg.content.toString()))
                channel.ack(msg)
            }
        })
    }
}
