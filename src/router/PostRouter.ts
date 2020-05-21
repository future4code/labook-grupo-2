import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router()
const postController = new PostController()

postRouter.post("/create", postController.createPost)
postRouter.get("/feed", postController.getFeed)
postRouter.get("/feed-type", postController.getFeedByType)
