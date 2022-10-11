import { SendNotificationUserCreated } from '../../src/application/SendNotificationUserCreated'
import { Ejs } from '../../src/infra/adapters/Ejs'
import { Mail } from '../../src/infra/adapters/Mail'
import { Queue } from '../../src/infra/adapters/Queue'
import { NotificationConsumer } from '../../src/infra/consumer/NotificationConsumer'

const mockedMail: Mail = {
    send: jest.fn()
}

const mockedQueue: Queue = {
    connect: jest.fn(),
    consume: jest.fn()
}

test('Should user a notification consumer', async () => {
    const template = new Ejs()
    const sendNotificationUserCreated = new SendNotificationUserCreated(template, mockedMail)
    const notificationConsumer = new NotificationConsumer(mockedQueue, sendNotificationUserCreated)
    const output = await notificationConsumer.execute()
    expect(output).toBeUndefined()
})
