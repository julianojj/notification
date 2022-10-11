import { randomUUID } from 'crypto'
import { Log } from '../domain/entities/Log'
import { LogRepository } from '../domain/repositories/LogRepository'
import { Mail } from '../infra/adapters/Mail'
import { Template } from '../infra/adapters/Template'

export class SendNotificationUserCreated {
    constructor(
        readonly logRepository: LogRepository,
        readonly template: Template,
        readonly mail: Mail,
    ) { }

    async execute(input: SendNotificationUserCreatedInput): Promise<SendNotificationUserCreatedOutput> {
        try {
            const html = await this.template.render('public/signup.ejs', input)
            await this.mail.send({
                from: {
                    name: process.env.MAIL_NAME,
                    address: process.env.MAIL_USER
                },
                to: {
                    name: input.name,
                    address: input.email
                },
                subject: 'Obrigado por inscrever-se!',
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

export type SendNotificationUserCreatedInput = {
    id: string,
    name: string,
    email: string
}

type SendNotificationUserCreatedOutput = {
    success: boolean
}
