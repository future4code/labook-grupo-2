import { BaseDatabase } from "./BaseDatabase";
import moment from "moment";

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
  public async getFeed(id: string): Promise<any> {
    const result = await this.connection().raw(`
    SELECT
      p.id as post_id,
      p.image,
      p.description,
      p.creation_date,
      p.type,
      u.name
    FROM LaBookPost p
    JOIN LaBookUser u ON p.user_id = u.id
    JOIN LaBookUserFollow f ON p.user_id = f.user_to_make_friendship_id OR p.user_id = f.user_id
    WHERE (f.user_id = "${id}" OR f.user_to_make_friendship_id = "${id}") AND p.user_id <> "${id}"
    ORDER BY creation_date DESC
    `) 
    const feed = []
    for(const item of result[0]){
      const creationDateFormated = moment(item.creation_date).format("DD/MM/YYYY")
      feed.push({
        postId: item.post_id,
        image: item.image,
        description: item.description,
        creationDate: creationDateFormated,
        type: item.type,
        name: item.name
      })
    }
    return feed
  }
}