import { MongoClient } from 'mongodb'
import { Log } from '../../domain/entities/Log'
import { LogRepository } from '../../domain/repositories/LogRepository'

export class LogRepositoryMongoDB implements LogRepository {
    private connection: MongoClient

    constructor() {
        this.connection = new MongoClient(process.env.MONGODB_URL)
    }

    async save(log: Log): Promise<void> {
        await this.connection.connect()
        const collection = this.connection.db('notification').collection('logs')
        await collection.insertOne(log)
    }

    async findAll(): Promise<Log[]> {
        await this.connection.connect()
        const collection = this.connection.db('notification').collection('logs')
        const rows = await collection.find().toArray()
        const logs: Log[] = []
        for (const data of rows) {
            logs.push(new Log(
                data.id, 
                data.content, 
                data.createdAt
            ))
        }
        return logs
    }
}
