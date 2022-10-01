import {Secret, sign} from 'jsonwebtoken'

interface Request {
    userId: string;
}
export type UserJWT = {
    id: string;
}

export class GenerateTokenProvider {
    do(request: Request){
        const token = sign(
            {
                id: request.userId
            } as UserJWT,
            process.env.JWT_TOKEN_SECRET as Secret,
            {expiresIn: '1h'}
        )
        return token
    }
}