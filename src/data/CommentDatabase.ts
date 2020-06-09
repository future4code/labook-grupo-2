import { BaseDatabase } from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "LaBookComment"

  public async commentPost(id: string, comment: string, userId: string, postId: string): Promise<void> {
    await this.connection()
    .insert({
      id,
      comment,
      user_id: userId,
      post_id: postId
    })
    .into(CommentDatabase.TABLE_NAME)
  }
}