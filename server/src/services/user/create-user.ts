import { hash } from "bcrypt";
import { User } from "../../entities/user";
import { UserRepositoryBase } from "../../repositories/user-repository";

export class CreateUser {
    repository: UserRepositoryBase;

    constructor(repository: UserRepositoryBase){
        this.repository = repository
    }

    async execute(user:User){
        const alreadyTakenUsername = (await this.repository.findUserByName(user.name)) !== null
        if(alreadyTakenUsername){
            throw new Error('Username already in use')
        }
        const encryptedPassword = await hash(user.password, 10)
        const createUser = new User({
            password: encryptedPassword,
            birthDay: user.birthDay,
            currentGrade: user.currentGrade,
            currentGraduation: user.currentGraduation,
            id: user.id,
            name: user.name
        })

        const createdUser = await this.repository.create(createUser)
        return createdUser
    }
}