import { User } from "../../entities/user";
import { CheckinRepository } from "../../repositories/checkin-repository";
import { UserRepository } from "../../repositories/user-repository";

interface Request {
  userId: string;
}
interface Response {
  user: User | null;
}

export class GetUserInfo {
  constructor(
    public userRepository: UserRepository,
    public checkinsRepository: CheckinRepository
  ) {}
  async do({ userId }: Request): Promise<Response> {
    const foundUser = (await this.userRepository.findById(userId)) ?? null;
    return {
      user: foundUser,
    };
  }
}
