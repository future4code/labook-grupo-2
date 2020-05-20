import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "LaBookPost"

  public async createPost(
    id: string,
    image: string,
    description: string,
    creationDate: Date,
    type: string,
    userId: string
  ): Promise<void> {
    await this.connection()
      .insert({
        id,
        image,
        description,
        creation_date: creationDate,
        type,
        user_id: userId
      })
      .into(PostDatabase.TABLE_NAME)

  }

}