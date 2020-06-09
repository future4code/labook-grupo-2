import { IdGenerator } from "../services/IdGenerator";
import { CommentDatabase } from "../data/CommentDatabase";

const idGenerator = new IdGenerator()
const commentDatabase = new CommentDatabase()
export class CommentBusiness {

  public async commentPost(comment: string, userId: string, postId: string) {
    const id = idGenerator.generatorId()
    return await commentDatabase.commentPost(id, comment, userId, postId)
  }
}