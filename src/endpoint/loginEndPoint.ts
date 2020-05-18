import { Request, Response } from 'express';
import { UserDatabase } from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import { Authenticator } from '../services/Authenticator';

export const loginEndPoint = async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userDataBase = new UserDatabase()
        const user = await userDataBase.getUserByEmail(email)

        const hashManager = new HashManager()
        const comparePasswords = await hashManager.compare(password, user.password)

        if (!comparePasswords) {
            throw new Error("Invalid Params")
        }

        const authenticator = new Authenticator()
        const token = authenticator.generationToken({
            id: user.id,
            role: user.role
        })

        res.status(200).send({
            token
        })

    } catch (err) {
        res.status(400).send({
            error: err.message
        })
    }
}