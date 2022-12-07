import { Classroom } from "../../entities/classroom";
import { GroupRepository } from "../../repositories/group-repository";
import { ClassroomRepository } from "../../repositories/classroom-repository";

type Request = Classroom;

export class CreateClassroom {
  constructor(
    public classroomRepository: ClassroomRepository,
    public groupRepository: GroupRepository,
    public actorId: string
  ) {}

  async do(request: Request) {
    const targetGroup = await this.groupRepository.findGroupById(request.groupId);
    if (!targetGroup) {
      throw new Error(`Group with id ${request.groupId} not found`);
    }
    if (
      !targetGroup.educatorsIds.includes(this.actorId) &&
      targetGroup.responsibleEducatorId !== this.actorId
    ) {
      throw new Error(
        "Cannot create a classroom since you are not authorized to do so"
      );
    }
    if (!targetGroup.educatorsIds.includes(request.educatorId) && targetGroup.responsibleEducatorId !== this.actorId) {
      throw new Error("Cannot create a classroom if educator does not exists");
    }
    const createdClassroom = await this.classroomRepository.create(
      new Classroom({
        educatorId: request.educatorId,
        groupId: request.groupId,
        type: request.type,
        endsAt: request.endsAt,
        startsAt: request.startsAt,
        weekdays: request.weekdays,
        content: request.content,
      })
    );
    return createdClassroom;
  }
}
