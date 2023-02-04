import { Membership as PrismaMembership, UserGroupRole } from "@prisma/client";

import { Membership, MembershipRole } from "../../../../app/entities/membership";

const prismaRoleToEntity = new Map<UserGroupRole, MembershipRole>([
  [UserGroupRole.PENDING, MembershipRole.PENDING],
  [UserGroupRole.MEMBER, MembershipRole.EDUCATOR],
  [UserGroupRole.EDUCATOR, MembershipRole.EDUCATOR],
]);
const entityRoleToPrisma = new Map<MembershipRole, UserGroupRole>([
  [MembershipRole.PENDING, UserGroupRole.PENDING],
  [MembershipRole.MEMBER, UserGroupRole.MEMBER],
  [MembershipRole.EDUCATOR, UserGroupRole.EDUCATOR],
]);

function getEntityRoleByPrisma(prismaRole: UserGroupRole) {
  return prismaRoleToEntity.get(prismaRole) ?? MembershipRole.PENDING;
}
function getPrismaRoleByEntity(entityRole: MembershipRole) {
  return entityRoleToPrisma.get(entityRole) ?? UserGroupRole.PENDING;
}

export class MembershipPrismaMapper {
  static toPrisma(membership: Membership): PrismaMembership {
    return {
      groupId: membership.groupId,
      id: membership.id,
      role: getPrismaRoleByEntity(membership.role),
      userId: membership.userId,
    };
  }
  static toDomain(raw: PrismaMembership) {
    return new Membership(
      {
        groupId: raw.groupId,
        userId: raw.userId,
        role: getEntityRoleByPrisma(raw.role),
      },
      raw.id
    );
  }
}
