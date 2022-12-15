import { UserRepository } from "../../repositories/user-repository";

export class ChangeUserName {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(userId: string, username: string) {
    const updatedUser = await this.repository.changeUserName(userId, username);
    return updatedUser;
  }
}
