import { MembershipRole } from "../../entities/membership";
import { GroupRepository } from "../../repositories/group-repository";
import { MembershipRepository } from "../../repositories/membership-repository";

interface Request {
  membershipId: string;
}

export class AcceptGroupRequest {
  constructor(
    private membershipRepository: MembershipRepository,
    private groupRepository: GroupRepository,
    private actorId: string
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

    const allowedActors = targetGroup?.membershipsIds;

    const membership = await this.membershipRepository.updateRole(
      membershipId,
      MembershipRole.MEMBER
    );
    return membership;
  }
}
