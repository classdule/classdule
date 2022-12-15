import { UserRepository } from "../../repositories/user-repository";

export class DeleteUser {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute(userId: string) {
    await this.repository.delete(userId);
  }
}
