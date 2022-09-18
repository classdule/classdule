import { UserRepositoryBase } from "../../repositories/user-repository";

export class GetAllUsers {
    constructor(
        public usersRepository: UserRepositoryBase
    ){}

    async do(){
        const queryResult = await this.usersRepository.findAll()
        return queryResult
    }
}