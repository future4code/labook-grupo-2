import { BaseDatabase } from './BaseDatabase'

export class UserDatabase extends BaseDatabase{
    public static TABLE_NAME = 'LaBookUser'

    public async createUser(id:string, email:string, name:string, password:string, role:string):Promise<void>{
        await this.connection().insert({
            id, email, name, password, role
        }).into(UserDatabase.TABLE_NAME)
    }
  }