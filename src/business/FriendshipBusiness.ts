import { FriendshipDatabase } from '../data/FriendshipDatabase'
import { Friendship } from '../model/Friendship'

const friendshipDatabase = new FriendshipDatabase()

export class FriendshipBusiness {
    
    public async makeFriendship(userId: string, userToMakeFriendshipId: string){
        const friendship = new Friendship(userId, userToMakeFriendshipId)
        const result = await friendshipDatabase.makeFriendship(friendship)
        
        return result
    }
    
    public async undoFriendship(userId: string, userUndoFriendshipId: string){
        const friendship = new Friendship(userId, userUndoFriendshipId)
        const result = await friendshipDatabase.undoFriendship(friendship)
        
        return result 
    }
}