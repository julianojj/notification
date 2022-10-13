import { SendNotificationPasswordForgot } from '../../src/application/SendNotificationPasswordForgot'
import { SendNotificationUserCreated } from '../../src/application/SendNotificationUserCreated'
import { Ejs } from '../../src/infra/adapters/Ejs'
import { JSONWebToken } from '../../src/infra/adapters/JSONWebToken'
import { Mail } from '../../src/infra/adapters/Mail'
import { Queue } from '../../src/infra/adapters/Queue'
import { NotificationConsumer } from '../../src/infra/consumer/NotificationConsumer'
import { LogRepositoryMemory } from '../../src/infra/repositories/LogRepositoryMemory'

const mockedMail: Mail = {
    send: jest.fn()
}

const mockedQueue: Queue = {
    connect: jest.fn(),
    consume: jest.fn()
}

test('Should user a notification consumer', async () => {
    const template = new Ejs()
    const sign = new JSONWebToken()
    const logRepository = new LogRepositoryMemory()
    const sendNotificationUserCreated = new SendNotificationUserCreated(logRepository, template, mockedMail)
    const sendNotificationPasswordForgot = new SendNotificationPasswordForgot(logRepository, template, mockedMail, sign)
    const notificationConsumer = new NotificationConsumer(
        mockedQueue,
        sendNotificationUserCreated,
        sendNotificationPasswordForgot
    )
    const output = await notificationConsumer.execute()
    expect(output).toBeUndefined()
})
