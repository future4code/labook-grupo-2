import express from "express";
import { PostController } from "../controller/PostController";
import { LikeController } from "../controller/LikeController";

export const postRouter = express.Router()
const postController = new PostController()
const likeController = new LikeController()

postRouter.post("/create", postController.createPost)

postRouter.post("/like", likeController.likePost)

postRouter.get("/feed", postController.getFeed)
postRouter.get("/feed-type", postController.getFeedByType)

postRouter.delete("/unlike", likeController.unlikePost)