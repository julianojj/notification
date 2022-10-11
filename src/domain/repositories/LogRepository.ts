import { Log } from '../entities/Log'

export interface LogRepository {
    save(log: Log): Promise<void>
    findAll(): Promise<Log[]>
}
