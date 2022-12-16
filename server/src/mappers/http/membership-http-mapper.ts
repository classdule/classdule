import { Membership } from "../../entities/membership";

export class MembershipHttpMapper {
  static toHttp(membership: Membership) {
    return {
      id: membership.id,
      role: membership.role,
      groupId: membership.groupId,
      userId: membership.userId,
    };
  }
}
