import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../data/UserDatabase'
import { FollowDatabase } from '../data/FollowDatabase'

export class FollowBusiness {
    
    public async makeFriendship(userId: string, userToMakeFriendshipId: string){
        const followDatabase = new FollowDatabase()
        const result = await followDatabase.makeFriendship(userId, userToMakeFriendshipId)

        return result
    }

    public async undoFriendship(userId: string, userUndoFriendshipId: string){
        const followDatabase = new FollowDatabase()
        const result = await followDatabase.undoFriendship(userId, userUndoFriendshipId)

        return result 
    }
}