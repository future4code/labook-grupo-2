import { Request, Response } from 'express'
import { IdGenerator } from '../services/IdGenerator'
import { HashManager } from '../services/HashManager'
import { UserDatabase } from '../data/UserDatabase'
import { Authenticator } from '../services/Authenticator'

export const signupEndpoint = async (req: Request, res: Response) => {
  try {
    const idGenerator = new IdGenerator()
    const id = idGenerator.generatorId()

    const data = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role
    }

    const hashManager = new HashManager()
    const hashPassword = await hashManager.hash(data.password)

    const userDatabase = new UserDatabase()
    await userDatabase.createUser(id, data.email, data.name, hashPassword, data.role)

    const authenticator = new Authenticator()
    const token = authenticator.generationToken({ id, role: data.role })

    res.status(200).send({
      token
    })
  } catch (err) {
    res.status(400).send({
      error: err.message
    })
  }
}