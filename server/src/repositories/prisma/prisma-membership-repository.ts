import { UserGroupRole } from "@prisma/client";

import { prismaClient } from "../../database/prisma";
import { Membership, MembershipRole } from "../../entities/membership";
import { MembershipRepository } from "../membership-repository";

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

    return queryResult.map((row) => {
      return new Membership(
        {
          groupId: row.groupId,
          userId: row.userId,
          role: getEntityRoleByPrisma(row.role),
        },
        row.id
      );
    });
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

    return queryResult.map((row) => {
      return new Membership(
        {
          groupId: row.groupId,
          userId: row.userId,
          role: getEntityRoleByPrisma(row.role),
        },
        row.id
      );
    });
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

    return new Membership(
      {
        groupId: queryResult.groupId,
        userId: queryResult.userId,
        role: getEntityRoleByPrisma(queryResult.role),
      },
      queryResult.id
    );
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

    return queryResult.map((row) => {
      return new Membership(
        {
          groupId: row.groupId,
          userId: row.userId,
          role: getEntityRoleByPrisma(row.role),
        },
        row.id
      );
    });
  }
  async create(membership: Membership) {
    const queryResult = await prismaClient.membership.create({
      data: {
        role: membership.role,
        groupId: membership.groupId,
        userId: membership.userId,
      },
    });

    return new Membership(
      {
        groupId: queryResult.groupId,
        userId: queryResult.userId,
        role: getEntityRoleByPrisma(queryResult.role),
      },
      queryResult.id
    );
  }
  async delete(membershipId: string) {
    const queryResult = await prismaClient.membership.delete({
      where: {
        id: membershipId,
      },
    });
    if (!queryResult) {
      return null;
    }

    return new Membership(
      {
        groupId: queryResult.groupId,
        userId: queryResult.userId,
        role: getEntityRoleByPrisma(queryResult.role),
      },
      queryResult.id
    );
  }
  async updateRole(membershipId: string, role: MembershipRole) {
    const queryResult = await prismaClient.membership.update({
      where: {
        id: membershipId,
      },
      data: {
        role: getPrismaRoleByEntity(role),
      },
    });
    return new Membership(
      {
        groupId: queryResult.groupId,
        userId: queryResult.userId,
        role: getEntityRoleByPrisma(queryResult.role),
      },
      queryResult.id
    );
  }
}
