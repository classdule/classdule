import { UserRepository } from "../../repositories/user-repository";

export class DeleteUser {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(userId: string) {
    const deletedUser = await this.repository.delete(userId);
    return deletedUser;
  }
}
