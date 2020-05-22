import { CommentDatabase } from "../data/CommentDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class CommentBusiness {

  public async commentPost(comment: string, userId: string, postId: string) {
    const idGenerator = new IdGenerator()
    const id = idGenerator.generatorId()

    const commentDatabase = new CommentDatabase()
    return await commentDatabase.commentPost(id, comment, userId, postId)
  }
}