import { Membership } from "../../entities/membership";
import { GroupRepository } from "../../repositories/group-repository";
import { MembershipRepository } from "../../repositories/membership-repository";
import { UserRepositoryBase } from "../../repositories/user-repository";

interface Request {
  membership: Membership;
}

export class CreateMembership {
  constructor(private membershipRepository: MembershipRepository) {}

  async do({ membership }: Request) {
    this.membershipRepository.create(membership);
  }
}
