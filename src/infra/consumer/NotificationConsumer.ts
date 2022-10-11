import { SendNotificationUserCreated, SendNotificationUserCreatedInput } from '../../application/SendNotificationUserCreated'
import { Queue } from '../adapters/Queue'

export class NotificationConsumer {
    constructor(
        readonly queue: Queue,
        readonly sendNotificationUserCreated: SendNotificationUserCreated
    ) { }

    async execute(): Promise<void> {
        await this.queue.consume('userCreated', async (msg: SendNotificationUserCreatedInput) => {
            await this.sendNotificationUserCreated.execute(msg)
        })
    }
}
