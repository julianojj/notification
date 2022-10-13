import { randomBytes } from 'crypto'
import 'dotenv/config'
import { SendNotificationPasswordForgot } from '../../src/application/SendNotificationPasswordForgot'
import { Ejs } from '../../src/infra/adapters/Ejs'
import { JSONWebToken } from '../../src/infra/adapters/JSONWebToken'
import { Mail } from '../../src/infra/adapters/Mail'
import { LogRepositoryMemory } from '../../src/infra/repositories/LogRepositoryMemory'

const mockedMail: Mail = {
    send: jest.fn()
}

test('Should send notification password forgot', async () => {
    const template = new Ejs()
    const logRepository = new LogRepositoryMemory()
    const sign = new JSONWebToken()
    const sendNotificationUserCreated = new SendNotificationPasswordForgot(logRepository, template, mockedMail, sign)
    const random = randomBytes(16).toString('hex')
    const input = {
        id: random,
        name: random,
        email: `${random}@test.com`
    }
    await sendNotificationUserCreated.execute(input)
    const logs = await logRepository.findAll()
    expect(logs).toHaveLength(1)
})
