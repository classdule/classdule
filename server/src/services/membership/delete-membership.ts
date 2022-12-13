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
    await this.membershipRepository.delete(membershipId);
  }
}
