import * as jwt from "jsonwebtoken";

export class Authenticator{
    private static getExpiresIn():number{
        return Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
    }

    public generationToken(input: AuthenticationData):string {
        const token = jwt.sign(
            input,
            process.env.JWT_KEY as string,
            {
                expiresIn: Authenticator.getExpiresIn()
            }
        )
        return token
    }

    public verify(token: string):AuthenticationData{
        const payload = jwt.verify(
            token,
            process.env.JWT_KEY as string
            )as any
        const result = {
            id: payload.id,
            role: payload.role
        }
        return result
    }
}

interface AuthenticationData {
    id: string
    role: string
}
