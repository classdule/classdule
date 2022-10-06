import { UserRepositoryBase } from "../../repositories/user-repository";

export class DeleteUser {
    repository: UserRepositoryBase;

    constructor(repository: UserRepositoryBase) {
        this.repository = repository;
    }

    async execute(userId: string){
        const deletedUser = await this.repository.delete(userId);
        return deletedUser;
    }
}