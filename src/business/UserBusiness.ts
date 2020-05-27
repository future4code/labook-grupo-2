import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../data/UserDatabase'
import { User } from '../model/User'

export class UserBusiness {

    public async signup(email: string, name: string, password: string, role: string){
        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const user = new User(id, email, name, hashPassword, role)

        const userDatabase = new UserDatabase()
        await userDatabase.createUser(user)

        return { id: id, role: role }
    }

    public async login(email: string, password: string){
        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmail(email)

        if(!user){
            throw new Error("Parâmetros incorretos !")// O usuário não existe 
        }
        

        const hashManager = new HashManager()
        const comparePasswords = await hashManager.compare(password, user.getPassword())

        if (!comparePasswords) {
            throw new Error("Invalid Params")
        }
        return { id: user.getId(), role: user.getRole()}

    }
    
}