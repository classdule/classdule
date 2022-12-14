import { Membership } from "../../entities/membership";
import { MembershipRepository } from "../../repositories/membership-repository";

interface Request {
  groupId: string;
  userId: string;
}

interface Response {
  membership: Membership;
}

export class CreateMembership {
  constructor(private membershipRepository: MembershipRepository) {}

  async do({ groupId, userId }: Request): Promise<Response> {
    const membership = new Membership({
      groupId,
      userId,
    });
    await this.membershipRepository.create(membership);
    return {
      membership: membership,
    };
  }
}
