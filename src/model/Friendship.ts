export class Friendship{
    constructor(
        private userId:string, 
        private userToMakeFriendshipId: string
    ){}

    public getUserId(): string {
        return this.userId
    }
    public getUserToMakeFriendshipId(): string {
        return this.userToMakeFriendshipId
    }
}