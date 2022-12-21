import { CheckinRepository } from "../../repositories/checkin-repository";
import { ClassroomRepository } from "../../repositories/classroom-repository";

interface Request {
  checkinId: string;
  verify: boolean;
  actorId: string;
}

export class VerifyCheckin {
  constructor(
    public checkinsRepository: CheckinRepository,
    public classroomRepository: ClassroomRepository,
  ) {}

  async do({ checkinId, verify, actorId }: Request) {
    const targetCheckin = await this.checkinsRepository.findById(checkinId);
    if (!targetCheckin) {
      throw new Error(`Check-in not found with id ${checkinId}`);
    }
    const targetClassroom = await this.classroomRepository.findById(
      targetCheckin.classroomId
    );
    if (!targetClassroom) {
      throw new Error(
        `Classroom not found with id ${targetCheckin.classroomId}`
      );
    }
    if (targetClassroom.educatorId !== actorId) {
      throw new Error("Only the educator should be able to verify a checkin");
    }
    await this.checkinsRepository.verify(checkinId, verify);
  }
}
