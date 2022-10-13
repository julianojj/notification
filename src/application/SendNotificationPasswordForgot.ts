import { randomUUID } from 'crypto'
import { Log } from '../domain/entities/Log'
import { LogRepository } from '../domain/repositories/LogRepository'
import { Mail } from '../infra/adapters/Mail'
import { Sign } from '../infra/adapters/Sign'
import { Template } from '../infra/adapters/Template'

export class SendNotificationPasswordForgot {
    constructor(
        readonly logRepository: LogRepository,
        readonly template: Template,
        readonly mail: Mail,
        readonly sign: Sign
    ) { }

    async execute(input: SendNotificationPasswordForgotInput): Promise<SendNotificationPasswordForgotOutput> {
        try {
            const token = this.sign.encode({
                id: input.id
            }, '15M')
            const html = await this.template.render('public/forgot.ejs', {
                name: input.name,
                url: `http://localhost:3000/password/reset?token=${token}`
            })
            await this.mail.send({
                from: {
                    name: process.env.MAIL_NAME,
                    address: process.env.MAIL_USER
                },
                to: {
                    name: input.name,
                    address: input.email
                },
                subject: 'Esqueceu sua senha?',
                html
            })
            const log = new Log(
                randomUUID(),
                `Send Message to user: ${input.id}`,
                new Date()
            )
            await this.logRepository.save(log)
            return {
                success: true
            }
        } catch (err) {
            const log = new Log(
                randomUUID(),
                `Error send Message to user: ${input.id}`,
                new Date()
            )
            await this.logRepository.save(log)
            return {
                success: false
            }
        }
    }
}

export type SendNotificationPasswordForgotInput = {
    id: string,
    name: string,
    email: string
}

type SendNotificationPasswordForgotOutput = {
    success: boolean
}
