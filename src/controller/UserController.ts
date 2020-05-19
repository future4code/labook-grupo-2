import { Request, Response } from "express";
import { UserBusiness } from '../business/UserBusiness'
import { Authenticator } from '../services/Authenticator'
import { FollowDatabase } from "../data/FollowDatabase";

export class UserController {

    async signup(req: Request, res: Response){
        try{
            const userBusiness = new UserBusiness()
            const data = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
              }

            const result = await userBusiness.signup(data.email, data.name, data.password, data.role)
            
            const authenticator = new Authenticator()
            const token = authenticator.generationToken({ 
                id: result.id, 
                role: result.role 
            })

            res.status(200).send({
                token
              })

        } catch(err){
            res.status(400).send({
                error: err.message
            })
        }
    }

    async login(req: Request, res: Response){
        try{
            const email = req.body.email
            const password = req.body.password

            const userBusiness = new UserBusiness()
            const result = await userBusiness.login(email, password)

            const authenticator = new Authenticator()
            const token = authenticator.generationToken({
                id: result.id,
                role: result.role
            })

            res.status(200).send({
                token
            })

        }catch(err){
            res.status(400).send({
                error: err.message
            })
        }
    }

}