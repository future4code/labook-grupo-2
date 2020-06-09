import express from "express";

import { PostController } from "../controller/PostController";
import { LikeController } from "../controller/LikeController";
import { CommentController } from "../controller/CommentController";

export const postRouter = express.Router()
const postController = new PostController()
const likeController = new LikeController()
const commentController = new CommentController()

postRouter.get("/feed", postController.getFeed)
postRouter.get("/feed-type", postController.getFeedByType)

postRouter.post("/create", postController.createPost)
postRouter.post("/comment", commentController.commentPost)
postRouter.post("/like", likeController.likePost)

postRouter.delete("/unlike", likeController.unlikePost)