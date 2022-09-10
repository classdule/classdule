import { User } from "../../entities/user";
import { UserRepositoryBase } from "../../repositories/user-repository";

export class CreateUser {
    repository: UserRepositoryBase;

    constructor(repository: UserRepositoryBase){
        this.repository = repository
    }

    async execute(user:User){
        const alreadyTakenUsername = (await this.repository.findUsersByName(user.name)).length>0
        if(alreadyTakenUsername){
            throw new Error('Username already in use')
        }
        await this.repository.create(user)
        return user
    }
}