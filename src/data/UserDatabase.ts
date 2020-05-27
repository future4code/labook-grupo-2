import { BaseDatabase } from './BaseDatabase'
import { User } from '../model/User'

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME = 'LaBookUser'

    private toModel(dbResult?: any): User | undefined {
        return (
            dbResult && new User(dbResult.id, dbResult.email, dbResult.name, dbResult.password, dbResult.role)
        )
    }

    public async createUser(user: User): Promise<void> {
        const userData = this.toModel(user)
        await this.connection()
            .insert({
                id: userData?.getId(),
                email: userData?.getEmail(),
                name: userData?.getName(),
                password: userData?.getPassword(),
                role: userData?.getRole()
            })
            .into(UserDatabase.TABLE_NAME)
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        const result = await this.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email })
        return this.toModel(result[0])
    }

}