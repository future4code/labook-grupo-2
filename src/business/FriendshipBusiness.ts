import { FriendshipDatabase } from '../data/FriendshipDatabase'

const friendshipDatabase = new FriendshipDatabase()

export class FriendshipBusiness {
    
    public async makeFriendship(userId: string, userToMakeFriendshipId: string){
        const result = await friendshipDatabase.makeFriendship(userId, userToMakeFriendshipId)
        
        return result
    }
    
    public async undoFriendship(userId: string, userUndoFriendshipId: string){
        const result = await friendshipDatabase.undoFriendship(userId, userUndoFriendshipId)
        
        return result 
    }
}