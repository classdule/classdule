import { compare } from 'bcrypt';

import { User } from '../../entities/user';
import { GenerateTokenProvider } from '../../providers/token-provider/generate-token-provider';
import {UserRepositoryBase} from '../../repositories/user-repository'

interface Response {
    validPassword: boolean;
    user: User;
    token: string
}
export class Signin {
    repository: UserRepositoryBase;

    constructor(repository: UserRepositoryBase){
        this.repository = repository;
    }
    async execute(email:string, password: string): Promise<Response>{
        const user = await this.repository.findByEmail(email);
        if(!user){
            throw new Error(`User not found with email ${email}`);
        }
        const isPasswordValid = await compare(password, user.password)
        if(!isPasswordValid){
            throw new Error('Invalid password');
        }
        const generateTokenProvider = new GenerateTokenProvider()
        const token = generateTokenProvider.do({
            userId: user.id
        });

        return {
            validPassword: isPasswordValid,
            user: user,
            token
        };
    }
}