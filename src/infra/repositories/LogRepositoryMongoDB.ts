import { MongoClient } from 'mongodb'
import { Log } from '../../domain/entities/Log'
import { LogRepository } from '../../domain/repositories/LogRepository'

export class LogRepositoryMongoDB implements LogRepository {
    private connection: MongoClient

    constructor() {
        this.connection = new MongoClient(process.env.MONGODB_URL)
    }

    async save(log: Log): Promise<void> {
        console.log(log)
        await this.connection.connect()
        const collection = this.connection.db('notification').collection('logs')
        await collection.insertOne(log)
    }

    async findAll(): Promise<Log[]> {
        await this.connection.connect()
        const collection = this.connection.db('notification').collection('logs')
        const logsData = await collection.find().toArray()
        const logs: Log[] = []
        for (const logData of logsData) {
            logs.push(new Log(
                logData.id, 
                logData.content, 
                logData.createdAt
            ))
        }
        return logs
    }
}
