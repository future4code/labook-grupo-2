import { IdGenerator } from "../services/IdGenerator"
import { PostDatabase } from "../data/PostDatabase"
import { Post } from "../model/Post"

export class PostBusiness {

  public async createPost(
    image: string,
    description: string,
    creationDate: Date,
    type: string,
    userId: string) {

    const idGenerator = new IdGenerator()
    const id = idGenerator.generatorId()

    const postDatabase = new PostDatabase()
    const post = new Post(
      id,
      image,
      description,
      creationDate,
      type,
      userId
    )
    return await postDatabase.createPost(post)
    
  }

  public async getFeed(id: string) {
    const postDatabase = new PostDatabase()
    return await postDatabase.getFeed(id)
  }  
}