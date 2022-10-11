import { Log } from '../../domain/entities/Log'
import { LogRepository } from '../../domain/repositories/LogRepository'

export class LogRepositoryMemory implements LogRepository {
    private logs: Log[] = []

    async save(log: Log): Promise<void> {
        this.logs.push(log)
    }

    async findAll(): Promise<Log[]> {
        return this.logs
    }
}
