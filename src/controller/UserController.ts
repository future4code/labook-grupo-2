import { Request, Response } from "express";
import { UserBusiness } from '../business/UserBusiness'
import { Authenticator } from '../services/Authenticator'
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";

export class UserController {

    async signup(req: Request, res: Response) {
        try {
            const userBusiness = new UserBusiness()
            const {
                email,
                name,
                password,
                role,
                device
            } = req.body

            if (
                !email || email === "" ||
                !name || name === "" ||
                !password || password === "" ||
                !device || device === ""
            ) {
                throw new Error("Parâmetros Inválidos")
            }

            if(password.length < 6){
                throw new Error("A senha deverá ter no mínimo 6 caracteres")
            }

            if(email.indexOf("@") === -1){
                throw new Error("Email inválido")
            }

            const result = await userBusiness.signup(email, name, password, role)

            const authenticator = new Authenticator()

            const acessToken = authenticator.generationToken(
                {
                    id: result.id,
                    role: result.role
                },
                process.env.ACCESS_TOKEN_EXPIRES_IN
            )

            const refreshToken = authenticator.generationToken(
                {
                    id: result.id,
                    device
                },
                process.env.REFRESH_TOKEN_EXPIRES_IN
            )

            const refreshTokenDatabase = new RefreshTokenDatabase()
            await refreshTokenDatabase.createRefreshToken(
                refreshToken,
                device,
                true,
                result.id
            )

            res.status(200).send({
                acessToken,
                refreshToken
            })

        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password, device } = req.body

            if (
                !email || email === "" ||
                !password || password === "" ||
                !device || device === ""
            ) {
                throw new Error("Parâmetros Inválidos")
            }

            const userBusiness = new UserBusiness()
            const result = await userBusiness.login(email, password)

            const authenticator = new Authenticator()

            const acessToken = authenticator.generationToken(
                {
                    id: result.id,
                    role: result.role
                },
                process.env.ACCESS_TOKEN_EXPIRES_IN
            )

            const refreshToken = authenticator.generationToken(
                {
                    id: result.id,
                    device
                },
                process.env.REFRESH_TOKEN_EXPIRES_IN
            )

            const refreshTokenDatabase = new RefreshTokenDatabase()

            const refreshTokenFromDb = await refreshTokenDatabase
                .getRefreshTokenByUserIdAndDevice(result.id, device)

            if (refreshTokenFromDb !== undefined) {
                await refreshTokenDatabase.deleteRefreshToken(refreshTokenFromDb.refreshToken)
            }

            await refreshTokenDatabase.createRefreshToken(
                refreshToken,
                device,
                true,
                result.id
            )

            res.status(200).send({
                acessToken,
                refreshToken
            })

        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }
    }


    async refreshAcessToken(req: Request, res: Response) {
        try {
            const { refreshToken, device } = req.body

            const authenticator = new Authenticator()
            const refreshTokenData = authenticator.verify(refreshToken)

            if (refreshTokenData.device !== device) {
                throw new Error("Esse aparelho não está autenticado!")
            }

            const acessToken = authenticator.generationToken(
                {
                    id: refreshTokenData.id,
                    role: refreshTokenData.role
                },
                process.env.ACCESS_TOKEN_EXPIRES_IN
            )

            res.status(200).send({
                acessToken
            })

        }
        catch (err) {
            res.status(400).send({
                error: err.message
            })
        }

    }

}