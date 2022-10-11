import { randomBytes } from 'crypto'
import 'dotenv/config'
import { SendNotificationUserCreated } from '../../src/application/SendNotificationUserCreated'
import { Ejs } from '../../src/infra/adapters/Ejs'
import { Mail } from '../../src/infra/adapters/Mail'

const mockedMail: Mail = {
    send: jest.fn()
}

test('Should send notification user created', async () => {
    const template = new Ejs()
    const sendNotificationUserCreated = new SendNotificationUserCreated(template, mockedMail)
    const random = randomBytes(16).toString('hex')
    const input = {
        id: random,
        name: random,
        email: `${random}@test.com`
    }
    const output = await sendNotificationUserCreated.execute(input)
    expect(output.success).toBeTruthy()
})
