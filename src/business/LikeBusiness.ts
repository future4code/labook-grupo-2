import { LikeDatabase } from "../data/LikeDatabase";

const likeDatabase = new LikeDatabase()
export class LikeBusiness {
    public async verifyLike(userId: string, postId: string){
        return await likeDatabase.verifyLike(userId, postId)
    }

    public async likePost(userId: string, postId: string){
        return await likeDatabase.likePost(userId, postId)
    }

    public async unlikePost(userId: string, postId: string){
        return await likeDatabase.unlikePost(userId, postId)
    }
}