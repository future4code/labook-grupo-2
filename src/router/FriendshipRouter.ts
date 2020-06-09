import express from "express";
import { FriendshipController } from "../controller/FriendshipController"

export const friendshipRouter = express.Router()
const friendshipController = new FriendshipController()

friendshipRouter.post("/make", friendshipController.makeFriendship)
friendshipRouter.delete("/undo", friendshipController.undoFriendship)
