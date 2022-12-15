import { UserRepository } from "../../repositories/user-repository";

export class ChangeUserName {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, username: string) {
    const targetUser = await this.userRepository.findById(userId);

    if (!targetUser) {
      throw new Error("User not found");
    }
    targetUser.name = username;
    await this.userRepository.save(targetUser);
  }
}
