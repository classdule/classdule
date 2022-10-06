import { hash } from "bcrypt";
import { User } from "../../entities/user";
import { UserRepositoryBase } from "../../repositories/user-repository";

export class CreateUser {
    repository: UserRepositoryBase;

    constructor(repository: UserRepositoryBase){
        this.repository = repository;
    }

    async execute(user:User){
        const alreadyTakenEmail = (await this.repository.findByEmail(user.email)) !== null;
        if(alreadyTakenEmail){
            throw new Error('User email already in use');
        }
        const encryptedPassword = await hash(user.password, 10);
        const createUser = new User({
            ...user.spreadProps,
            password: encryptedPassword
        });

        const createdUser = await this.repository.create(createUser);
        return createdUser;
    }
}