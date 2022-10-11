import { randomBytes } from 'crypto'
import 'dotenv/config'
import { SendNotificationUserCreated } from '../../src/application/SendNotificationUserCreated'
import { Ejs } from '../../src/infra/adapters/Ejs'
import { Mail } from '../../src/infra/adapters/Mail'
import { LogRepositoryMemory } from '../../src/infra/repositories/LogRepositoryMemory'

const mockedMail: Mail = {
    send: jest.fn()
}

test('Should send notification user created', async () => {
    const template = new Ejs()
    const logRepository = new LogRepositoryMemory()
    const sendNotificationUserCreated = new SendNotificationUserCreated(logRepository, template, mockedMail)
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
