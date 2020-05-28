import { BaseDatabase } from "./BaseDatabase";
import { Friendship } from "../model/Friendship";

export class FriendshipDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "LaBookUserFriendship"

  private toModel(dbResult?: any): Friendship | undefined {
    return (
      dbResult && new Friendship(dbResult.userId, dbResult.userToMakeFriendshipId)
    )
  }

  public async makeFriendship(friendship: Friendship): Promise<void> {
    await this.connection()
      .insert({
        user_id: friendship.getUserId(),
        user_to_make_friendship_id: friendship.getUserToMakeFriendshipId()
      })
      .into(FriendshipDatabase.TABLE_NAME)
  }

  public async getFriendshipById(id: string): Promise<any[]> {
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

  public async undoFriendship(friendship: Friendship): Promise<void> {
    const friendshipData = this.toModel(friendship)
    await this.connection()
      .delete()
      .from(FriendshipDatabase.TABLE_NAME)
      .where({
        user_id: friendshipData?.getUserId(),
        user_to_make_friendship_id: friendshipData?.getUserToMakeFriendshipId()
      }).orWhere({
        user_id: friendshipData?.getUserToMakeFriendshipId(),
        user_to_make_friendship_id: friendshipData?.getUserId()
      })
  }
}