import express from "express";
import { FollowController } from "../controller/FollowController"

export const followRouter = express.Router()
const followController = new FollowController()

followRouter.post("/make-friendship", followController.makeFriendship)