import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../data/UserDatabase'
import { FollowDatabase } from '../data/FollowDatabase'

export class UserBusiness {

    public async signup(email: string, name: string, password: string, role: string){
        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const userDatabase = new UserDatabase()
        await userDatabase.createUser(id, email, name, hashPassword, role)

        return { id: id, role: role }
    }

    public async login(email: string, password: string){
        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmail(email)

        const hashManager = new HashManager()
        const comparePasswords = await hashManager.compare(password, user.password)

        if (!comparePasswords) {
            throw new Error("Invalid Params")
        }
        return { id: user.id, role: user.role}

    }
    
}