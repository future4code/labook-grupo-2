import { BaseDatabase } from './BaseDatabase'

export class UserDatabase extends BaseDatabase {
    public static TABLE_NAME = 'LaBookUser'

    public async createUser(id: string, email: string, name: string, password: string, role: string): Promise<void> {
        await this.connection()
            .insert({
                id, email, name, password, role
            })
            .into(UserDatabase.TABLE_NAME)
    }

    public async getUserByEmail(email: string): Promise<any> {
        const result = await this.connection()
            .select("*")
            .from(UserDatabase.TABLE_NAME)
            .where({ email })
        return result[0]
    }

}