import { CheckinRepository } from "../../repositories/checkin-repository";
import { UserRepositoryBase } from "../../repositories/user-repository";

interface Request {
  userId: string;
}
interface Response {
  user: {
    name: string;
    id: string;
    currentGrade: number;
    currentGraduation: string;
    birthday: Date;
    email: string;
  }
  checkinsCount: number;
}

export class GetUserInfo {
  constructor(
    public userRepository: UserRepositoryBase,
    public checkinsRepository: CheckinRepository
  ){}
  async do({userId}:Request): Promise<Response | null>{
    const foundUser = await this.userRepository.findById(userId);
    const foundCheckins = await this.checkinsRepository.findByUserId(userId);
    if(foundUser){
      return {
        checkinsCount: foundCheckins.length,
        user: {
          name: foundUser.name,
          birthday: foundUser.birthDay,
          currentGrade: foundUser.currentGrade,
          currentGraduation: foundUser.currentGraduation,
          id: foundUser.id,
          email: foundUser.email
        }
      };
    }
    return null;
  }
}