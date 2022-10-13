import { SendNotificationPasswordForgot, SendNotificationPasswordForgotInput } from '../../application/SendNotificationPasswordForgot'
import { SendNotificationUserCreated, SendNotificationUserCreatedInput } from '../../application/SendNotificationUserCreated'
import { Queue } from '../adapters/Queue'

export class NotificationConsumer {
    constructor(
        readonly queue: Queue,
        readonly sendNotificationUserCreated: SendNotificationUserCreated,
        readonly sendNotificationPasswordForgot: SendNotificationPasswordForgot
    ) { }

    async execute(): Promise<void> {
        await this.queue.consume('userCreated', async (msg: SendNotificationUserCreatedInput) => {
            await this.sendNotificationUserCreated.execute(msg)
        })

        await this.queue.consume('passwordForgot', async (msg: SendNotificationPasswordForgotInput) => {
            await this.sendNotificationPasswordForgot.execute(msg)
        })
    }
}
