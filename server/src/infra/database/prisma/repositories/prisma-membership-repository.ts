import { UserGroupRole } from "@prisma/client";

import { prismaClient } from "../client";
import {
  Membership,
  MembershipRole,
} from "../../../../app/entities/membership";
import { MembershipPrismaMapper } from "../mappers/membership-prisma-mapper";
import { MembershipRepository } from "../../../../app/repositories/membership-repository";

const entityRoleToPrisma = new Map<MembershipRole, UserGroupRole>([
  [MembershipRole.PENDING, UserGroupRole.PENDING],
  [MembershipRole.MEMBER, UserGroupRole.MEMBER],
  [MembershipRole.EDUCATOR, UserGroupRole.EDUCATOR],
]);

function getPrismaRoleByEntity(entityRole: MembershipRole) {
  return entityRoleToPrisma.get(entityRole) ?? UserGroupRole.PENDING;
}

export class PrismaMembershipRepository implements MembershipRepository {
  async findAll() {
    const queryResult = await prismaClient.membership.findMany({
      include: {
        user: {
          select: {
            id: true,
          },
        },
        group: {
          select: {
            id: true,
          },
        },
      },
    });

    return queryResult.map(MembershipPrismaMapper.toDomain);
  }
  async findByGroup(groupId: string) {
    const queryResult = await prismaClient.membership.findMany({
      include: {
        user: {
          select: {
            id: true,
          },
        },
        group: {
          select: {
            id: true,
          },
        },
      },
      where: {
        groupId: groupId,
      },
    });

    return queryResult.map(MembershipPrismaMapper.toDomain);
  }
  async findById(membershipId: string) {
    const queryResult = await prismaClient.membership.findUnique({
      where: {
        id: membershipId,
      },
    });
    if (!queryResult) {
      return null;
    }

    return MembershipPrismaMapper.toDomain(queryResult);
  }
  async findByUser(userId: string) {
    const queryResult = await prismaClient.membership.findMany({
      include: {
        user: {
          select: {
            id: true,
          },
        },
        group: {
          select: {
            id: true,
          },
        },
      },
      where: {
        userId: userId,
      },
    });

    return queryResult.map(MembershipPrismaMapper.toDomain);
  }
  async create(membership: Membership) {
    await prismaClient.membership.create({
      data: {
        role: membership.role,
        groupId: membership.groupId,
        userId: membership.userId,
      },
    });
  }
  async delete(membershipId: string) {
    await prismaClient.membership.delete({
      where: {
        id: membershipId,
      },
    });
  }
  async updateRole(membershipId: string, role: MembershipRole) {
    await prismaClient.membership.update({
      where: {
        id: membershipId,
      },
      data: {
        role: getPrismaRoleByEntity(role),
      },
    });
  }
}
