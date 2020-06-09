import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { Authenticator } from "../services/Authenticator";
import { PostOutput } from "../model/Post";
import { BaseDatabase } from "../data/BaseDatabase";

const authenticator = new Authenticator()
const postBusiness = new PostBusiness()

export class PostController {

  async createPost(req: Request, res: Response) {
    try {
      const { image, description, type } = req.body
      if (
        description === undefined ||
        image === undefined ||
        (description === "" && image === "")
      ) {
        throw new Error("Parâmetro inválido")
      }

      const token = req.headers.authorization as string
      const date = new Date()

      const userData = authenticator.verify(token)

      await postBusiness.createPost(image, description, date, type, userData.id)

      res.status(200).send({
        message: "Post criado com sucesso !"
      })

    } catch (err) {
      res.status(400).send({
        error: err.message
      })
    }

    await BaseDatabase.destroyConnection()
  }

  async getFeed(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string

      const userData = authenticator.verify(token)

      const feed: PostOutput[] = await postBusiness.getFeed(userData.id)

      res.status(200).send({
        feed
      })
    } catch (err) {
      res.status(400).send({
        error: err.message
      })
    }

    await BaseDatabase.destroyConnection()
  }


  async getFeedByType(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const { type } = req.body

      const userData = authenticator.verify(token)

      const feed: PostOutput[] = await postBusiness.getFeed(userData.id)
      const filteredFeed = feed.filter(post => post.type === type)

      res.status(200).send({
        feed: filteredFeed
      })

    } catch (err) {
      res.status(400).send({
        error: err.message
      })
    }

    await BaseDatabase.destroyConnection()
  }
}
