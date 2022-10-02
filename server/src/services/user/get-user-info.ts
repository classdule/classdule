import { CheckinRepository } from "../../repositories/checkin-repository";
import { UserRepositoryBase } from "../../repositories/user-repository";

interface Request {
  userId: string;
}
interface Response {
  userName: string;
  userId: string;
  checkinsCount: number;
}

export class GetUserInfo {
  constructor(
    public userRepository: UserRepositoryBase,
    public checkinsRepository: CheckinRepository
  ){}
  async do({userId}:Request): Promise<Response | null>{
    const foundUser = await this.userRepository.findById(userId);
    if(foundUser){
      return {
        checkinsCount: 0,
        userId: 'aaa',
        userName: 'yes',
      };
    }
    return null;
  }
}