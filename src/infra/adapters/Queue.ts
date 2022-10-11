export interface Queue {
    connect(): Promise<void>
    consume(eventName: string, callback: any): Promise<void>
}
