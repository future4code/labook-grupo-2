import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { LikeBusiness } from "../business/LikeBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

const authenticator = new Authenticator()
const likeBusiness = new LikeBusiness()

export class LikeController {

    async likePost(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const { postId } = req.body

            if (postId === undefined || postId === "") {
                throw new Error("Informe poste para curtir.")
            }

            if(token === undefined || token === ""){
                throw new Error("O usuário deve estar logado.")
            }

            const userId = authenticator.verify(token).id

            const verifyLike = await likeBusiness.verifyLike(userId, postId)
            if (verifyLike !== 0) {
                throw new Error("Você não pode curtir este post novamente")
            }

            await likeBusiness.likePost(userId, postId)

            res.status(200).send({
                message: "Post curtido com sucesso!"
            })

        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }

        await BaseDatabase.destroyConnection()
    }
    async unlikePost(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const { postId } = req.body

            const userId = authenticator.verify(token).id

            const verifyLike = await likeBusiness.verifyLike(userId, postId)
            if (verifyLike === 0) {
                throw new Error("Você não pode descurtir um post que você não curtiu!")
            }

            await likeBusiness.unlikePost(userId, postId)

            res.status(200).send({
                message: "Post descurtido com sucesso!"
            })

        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }

        await BaseDatabase.destroyConnection()
    }
}