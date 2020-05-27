import { BaseDatabase } from './BaseDatabase'
import { User } from '../model/User'

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME = 'LaBookUser'

    private toModel(dbResult?:any):User | undefined{
        return (
            dbResult && new User(dbResult.id, dbResult.email, dbResult.name, dbResult.password, dbResult.role)
        )
    }

    public async createUser(id: string, email: string, name: string, password: string, role: string): Promise<void> {
        await this.connection()
            .insert({
                id, email, name, password, role
            })
            .into(UserDatabase.TABLE_NAME)
    }

    public async getUserByEmail(email: string): Promise<User | undefined>  {
        const result = await this.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email })
        return this.toModel(result[0])
    }

}