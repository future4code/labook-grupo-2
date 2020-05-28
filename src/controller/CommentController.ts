import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { CommentBusiness } from "../business/CommentBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

const authenticator = new Authenticator()
const commentBusiness = new CommentBusiness()

export class CommentController {
  async commentPost(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const { comment, postId } = req.body

      const userId = authenticator.verify(token).id

      await commentBusiness.commentPost(comment, userId, postId)

      res.status(200).send({
        message: "Comentário criado com sucesso !"
      })

    } catch (err) {
      res.status(400).send({
        error: err.message
      })
    }

    await BaseDatabase.destroyConnection()
  }

}