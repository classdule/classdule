import { UserRepositoryBase } from "../../repositories/user-repository";

export class ChangeUserName {
    repository: UserRepositoryBase;

    constructor(repository: UserRepositoryBase){
        this.repository = repository;
    }

    async execute(userId: string, username: string){
        const alreadyTakenUsername = !!(await this.repository.findUserByName(username));
        if(alreadyTakenUsername){
            throw new Error("Username already in use");
        }
        const updatedUser = await this.repository.changeUserName(userId, username);
        return updatedUser;
    }
}