import { Mail } from '../infra/adapters/Mail'
import { Template } from '../infra/adapters/Template'

export class SendNotificationUserCreated {
    constructor(
        readonly template: Template,
        readonly mail: Mail
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
            return {
                success: true
            }
        } catch (err) {
            return {
                success: false
            }
        }
    }
}

type SendNotificationUserCreatedInput = {
    id: string,
    name: string,
    email: string
}

type SendNotificationUserCreatedOutput = {
    success: boolean
}
