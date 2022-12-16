import { isSameDay, getDay } from "date-fns";

import { Checkin } from "../../entities/checkin";
import { MembershipRole } from "../../entities/membership";
import { CheckinRepository } from "../../repositories/checkin-repository";
import { ClassroomRepository } from "../../repositories/classroom-repository";
import { GroupRepository } from "../../repositories/group-repository";
import { MembershipRepository } from "../../repositories/membership-repository";

interface Request {
  classroomId: string;
  userId: string;
  createdAt?: Date;
}

interface Response {
  checkin: Checkin;
}

export class CreateCheckin {
  constructor(
    private classroomRepository: ClassroomRepository,
    private checkinRepository: CheckinRepository,
    private groupRepository: GroupRepository,
    private membershipRepository: MembershipRepository
  ) {}

  async do(request: Request): Promise<Response> {
    const checkin = new Checkin({
      classroomId: request.classroomId,
      userId: request.userId,
      createdAt: request.createdAt,
    });
    const targetClassroom =
      (await this.classroomRepository.findById(request.classroomId)) || null;
    if (!targetClassroom) {
      throw new Error(`Classroom not found with id ${request.classroomId}`);
    }
    const classroomGroup = await this.groupRepository.findGroupById(
      targetClassroom.groupId
    );

    if (classroomGroup === null) {
      throw new Error(`Group not found with id ${targetClassroom.groupId}`);
    }
    const classroomGroupMemberships =
      await this.membershipRepository.findByGroup(classroomGroup.id);
    const classroomGroupMembersIds = classroomGroupMemberships
      .filter((membership) => membership.role === MembershipRole.MEMBER)
      .map((membership) => membership.userId);

    if (!classroomGroupMembersIds.includes(request.userId)) {
      throw new Error(`Group member with id ${request.userId} not found`);
    }
    const weekDay = getDay(checkin.createdAt);
    const isClassroomOpen = targetClassroom.weekdays.includes(weekDay);

    if (!isClassroomOpen) {
      throw new Error(
        "Check-ins can just be assigned in the same day as the classroom"
      );
    }
    const sameDayCheckins = await this.checkinRepository.findByDate(
      checkin.createdAt,
      checkin.userId
    );
    const conflictingCheckins = sameDayCheckins.filter(
      (checkin) => checkin.classroomId === request.classroomId
    );
    if (conflictingCheckins.length > 0) {
      throw new Error(
        "Cannot create two checkins for the same classroom in a same day"
      );
    }
    await this.checkinRepository.create(checkin);
    return {
      checkin: checkin,
    };
  }
}
