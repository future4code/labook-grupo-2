import { LikeDatabase } from "../data/LikeDatabase";

export class LikeBusiness {
    public async verifyLike(userId: string, postId: string){

        const likeDatabase = new LikeDatabase()
        return await likeDatabase.verifyLike(userId, postId)
    }

    public async likePost(userId: string, postId: string){

        const likeDatabase = new LikeDatabase()
        return await likeDatabase.likePost(userId, postId)
    }

}