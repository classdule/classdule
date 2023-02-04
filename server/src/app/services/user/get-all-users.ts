import { UserRepository } from "../../repositories/user-repository";

export class GetAllUsers {
  constructor(public usersRepository: UserRepository) {}

  async do() {
    const queryResult = await this.usersRepository.findAll();
    return queryResult;
  }
}
