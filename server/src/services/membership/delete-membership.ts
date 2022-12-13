import { MembershipRole } from "../../entities/membership";
import { GroupRepository } from "../../repositories/group-repository";
import { MembershipRepository } from "../../repositories/membership-repository";

interface Request {
  membershipId: string;
}

export class DeleteMembership {
  constructor(
    public membershipRepository: MembershipRepository,
    public groupRepository: GroupRepository,
    public actorId: string
  ) {}

  async do({ membershipId }: Request) {
    const targetMembership = await this.membershipRepository.findById(
      membershipId
    );

    if (!targetMembership) {
      throw new Error(`Membership not found with id ${membershipId}`);
    }
    const targetGroup = await this.groupRepository.findGroupById(
      targetMembership.groupId
    );

    if (!targetGroup) {
      throw new Error(`Group not found with id ${targetMembership.groupId}`);
    }

    const allowedActorsIds = [
      ...(await this.membershipRepository.findByGroup(targetMembership.groupId))
        .filter((membership) => membership.role === MembershipRole.EDUCATOR)
        .map((membership) => membership.userId),
      targetGroup?.responsibleEducatorId,
    ];

    if (!allowedActorsIds.includes(this.actorId)) {
      throw new Error(`Actor is not allowed to do so`);
    }

    await this.membershipRepository.delete(membershipId);
  }
}
