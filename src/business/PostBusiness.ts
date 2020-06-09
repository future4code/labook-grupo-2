import { IdGenerator } from "../services/IdGenerator"
import { PostDatabase } from "../data/PostDatabase"
import { Post } from "../model/Post"

const idGenerator = new IdGenerator()
const postDatabase = new PostDatabase()
export class PostBusiness {

  public async createPost(image: string, description: string, creationDate: Date, type: string, userId: string) {
    const id = idGenerator.generatorId()
    const post = new Post(id, image, description, creationDate, type, userId)
    return await postDatabase.createPost(post)  
  }

  public async getFeed(id: string) {
    return await postDatabase.getFeed(id)
  }  
}