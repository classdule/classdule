import { Classroom } from "../../entities/classroom";
import { GroupRepository } from "../../repositories/group-repository";
import { ClassroomRepository } from "../../repositories/classroom-repository";
import { MembershipRepository } from "../../repositories/membership-repository";
import { MembershipRole } from "../../entities/membership";
import { Day } from "date-fns";

interface Request {
  groupId: string;
  educatorId: string;
  type: string;
  endsAt: Date;
  startsAt: Date;
  weekdays: Day[];
  content: string;
}

interface Response {
  classroom: Classroom;
}

export class CreateClassroom {
  constructor(
    public classroomRepository: ClassroomRepository,
    public groupRepository: GroupRepository,
    public membershipRepository: MembershipRepository,
    public actorId: string
  ) {}

  async do(request: Request): Promise<Response> {
    const targetGroup = await this.groupRepository.findGroupById(
      request.groupId
    );
    if (!targetGroup) {
      throw new Error(`Group with id ${request.groupId} not found`);
    }
    const groupMemberships = await this.membershipRepository.findByGroup(
      targetGroup.id
    );
    const groupEducatorsIds = groupMemberships
      .filter((membership) => membership.role === MembershipRole.EDUCATOR)
      .map((membership) => membership.userId);
    if (
      !groupEducatorsIds.includes(this.actorId) &&
      targetGroup.responsibleEducatorId !== this.actorId
    ) {
      throw new Error(
        "Cannot create a classroom since you are not authorized to do so"
      );
    }
    if (
      !groupEducatorsIds.includes(request.educatorId) &&
      targetGroup.responsibleEducatorId !== this.actorId
    ) {
      throw new Error("Cannot create a classroom if educator does not exists");
    }

    const classroom = new Classroom({
      educatorId: request.educatorId,
      groupId: request.groupId,
      type: request.type,
      endsAt: request.endsAt,
      startsAt: request.startsAt,
      weekdays: request.weekdays,
      content: request.content,
    });
    await this.classroomRepository.create(classroom);
    return {
      classroom,
    };
  }
}
