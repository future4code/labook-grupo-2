import { Request, Response } from "express";
import { Authenticator } from '../services/Authenticator'
import { FollowDatabase } from "../data/FollowDatabase";

export class FollowController {

    async makeFriendship(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const userToMakeFriendshipId = req.body.userToMakeFriendshipId

            if (!userToMakeFriendshipId || userToMakeFriendshipId === "") {
                throw new Error("Informe um usúario que voce gostaria de ser amigo!")
            }

            const authenticator = new Authenticator()
            const userData = authenticator.verify(token)

            const followBusiness = new FollowDatabase()
            await followBusiness.makeFriendship(userData.id, userToMakeFriendshipId)

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

            const authenticator = new Authenticator()
            const userData = authenticator.verify(token)


            const followBusiness = new FollowDatabase()
            const friendships = await followBusiness.getFriendshipById(userData.id)
            const userRelation = friendships.find((relation)=>{
                return relation.user_id === userUndoFriendshipId || relation.user_to_make_friendship_id === userUndoFriendshipId
            })
            if(userRelation === undefined){
                throw new Error("Você não tem amizade com esse usuário")
            }
            await followBusiness.undoFriendship(userData.id, userUndoFriendshipId)

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