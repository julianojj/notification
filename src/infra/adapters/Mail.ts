export interface Mail {
    send(message: Message): Promise<void>
}

type From = {
    name: string,
    address: string
}

type To = {
    name: string,
    address: string
}

export type Message = {
    from: From,
    to: To,
    subject: string,
    html: string
}
