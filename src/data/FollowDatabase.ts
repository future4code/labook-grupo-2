import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase{
  private static TABLE_NAME:string = "LaBookUserFollow"

  public async makeFriendship(userId:string, userToMakeFriendshipId: string): Promise<void>{
    await this.connection()
    .insert({
      user_id: userId,
      user_to_make_friendship_id: userToMakeFriendshipId
    })
    .into(FollowDatabase.TABLE_NAME)

  }

}