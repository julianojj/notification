import 'dotenv/config'
import { SendNotificationUserCreated } from './application/SendNotificationUserCreated'
import { Ejs } from './infra/adapters/Ejs'
import { Nodemailer } from './infra/adapters/Nodemailer'
import { RabbitMQ } from './infra/adapters/RabbitMQ'
import { NotificationConsumer } from './infra/consumer/NotificationConsumer'

(async () => {
    const template = new Ejs()
    const mail = new Nodemailer()
    const queue = new RabbitMQ()
    await queue.connect()
    const sendNotificationUserCreated = new SendNotificationUserCreated(template, mail)
    const notificationConsumer = new NotificationConsumer(queue, sendNotificationUserCreated)
    await notificationConsumer.execute()
})()
