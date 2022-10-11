import nodemailer, { Transporter } from 'nodemailer'
import { Mail, Message } from './Mail'

export class Nodemailer implements Mail {
    private transport: Transporter

    constructor() {
        this.transport = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
    }

    async send(message: Message): Promise<void> {
        await this.transport.sendMail(message)
        this.transport.close()
    }
}
