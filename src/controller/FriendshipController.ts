import { Request, Response } from "express";
import { Authenticator } from '../services/Authenticator'
import { FriendshipDatabase } from "../data/FriendshipDatabase";
import { Friendship } from "../model/Friendship";

const friendshipBusiness = new FriendshipDatabase()
const authenticator = new Authenticator()

export class FriendshipController {
    async makeFriendship(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const userToMakeFriendshipId = req.body.userToMakeFriendshipId

            if (!userToMakeFriendshipId || userToMakeFriendshipId === "") {
                throw new Error("Informe  um usúario que voce gostaria de ser amigo!")
            }

            const userData = authenticator.verify(token)

            const friendships = await friendshipBusiness.getFriendshipById(userData.id)
            const userRelation = friendships.find((relation)=>{
                return relation.user_id === userToMakeFriendshipId || relation.user_to_make_friendship_id === userToMakeFriendshipId
            })
            if(userRelation){
                throw new Error("Você já têm amizade com esse usuário")
            }
            const friendship = new Friendship(userData.id, userToMakeFriendshipId)
            await friendshipBusiness.makeFriendship(friendship)

            res.status(200).send({
                message: "Parabens, voce tem um novo amigo !"
            })
        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }
    }
    async undoFriendship(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const userUndoFriendshipId = req.body.userUndoFriendshipId

            if (!userUndoFriendshipId || userUndoFriendshipId === "") {
                throw new Error("Informe um usúario que voce gostaria de deixar de ser amigo!")
            }

            const userData = authenticator.verify(token)

            const friendships = await friendshipBusiness.getFriendshipById(userData.id)
            const userRelation = friendships.find((relation)=>{
                return relation.user_id === userUndoFriendshipId || relation.user_to_make_friendship_id === userUndoFriendshipId
            })
            if(userRelation === undefined){
                throw new Error("Você não tem amizade com esse usuário")
            }
            const friendship= new Friendship(userData.id, userUndoFriendshipId)
            await friendshipBusiness.undoFriendship(friendship)

            res.status(200).send({
                message: "Você desfez a amizade!"
            })
        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }
    }
}