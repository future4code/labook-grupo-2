import { BaseDatabase } from "./BaseDatabase";

export class LikeDatabase extends BaseDatabase{
    private static TABLE_NAME: string = "LaBookLike"

    public async verifyLike(userId: string, postId: string):Promise<any> {
        const result = await this.connection().raw(`
        SELECT COUNT(*) as count 
        FROM LaBookLike
        WHERE user_id = "${userId}" AND post_id = "${postId}"
        `)
        
        return result[0][0].count
    }

    public async likePost(userId: string, postId: string):Promise<void> {
        await this.connection()
        .insert({
            user_id: userId,
            post_id: postId
        })
        .into(LikeDatabase.TABLE_NAME)
    }
}