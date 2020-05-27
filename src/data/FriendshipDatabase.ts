import { BaseDatabase } from "./BaseDatabase";

export class FriendshipDatabase extends BaseDatabase{
  private static TABLE_NAME:string = "LaBookUserFriendship"

  public async makeFriendship(userId:string, userToMakeFriendshipId: string): Promise<void>{
    await this.connection()
    .insert({
      user_id: userId,
      user_to_make_friendship_id: userToMakeFriendshipId
    })
    .into(FriendshipDatabase.TABLE_NAME)

  }
  public async getFriendshipById(id: string): Promise<any[]>{
    const result = await this.connection()
    .select("*")
    .from(FriendshipDatabase.TABLE_NAME)
    .where({ 
      user_id: id
     })
     .orWhere({
       user_to_make_friendship_id: id
     })
    return result
  }

  public async undoFriendship(userId:string, userUndoFriendshipId: string): Promise<void>{
    await this.connection()
    .delete()
    .from(FriendshipDatabase.TABLE_NAME)
    .where({
      user_id: userId,
      user_to_make_friendship_id: userUndoFriendshipId
    }).orWhere({
      user_id: userUndoFriendshipId,
      user_to_make_friendship_id: userId
    })
  }
}