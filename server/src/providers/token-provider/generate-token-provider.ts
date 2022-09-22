import {Secret, sign} from 'jsonwebtoken'

interface Request {
    userId: string;
}

export class GenerateTokenProvider {
    do(request: Request){
        const token = sign(
            {
                id: request.userId
            },
            process.env.JWT_TOKEN_SECRET as Secret,
            {expiresIn: '1h'}
        )
        return token
    }
}