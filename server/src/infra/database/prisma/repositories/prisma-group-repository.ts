import { Group } from "../../app/entities/group";
import { GroupRepository } from "../group-repository";

import { prismaClient } from "../../infra/database/prisma/client";
import { UserGroupRole } from "@prisma/client";
import { GroupPrismaMapper } from "../../infra/api/mappers/prisma/group-prisma-mapper";

export class PrismaGroupRepository implements GroupRepository {
  async create(group: Group) {
    await prismaClient.group.create({
      data: {
        location: group.location,
        name: group.name,
        responsibleEducator: {
          connect: {
            id: group.responsibleEducatorId,
          },
        },
      },
      include: {
        responsibleEducator: true,
        memberships: true,
      },
    });
  }
  async delete(groupId: string) {
    await prismaClient.group.delete({
      where: {
        id: groupId,
      },
      include: {
        memberships: {
          where: {
            role: UserGroupRole.EDUCATOR,
          },
        },
        responsibleEducator: true,
      },
    });
  }
  async findGroupByName(groupName: string) {
    const queryResult =
      (await prismaClient.group.findUnique({
        where: {
          name: groupName,
        },
        include: {
          memberships: {
            select: {
              id: true,
            },
          },
          responsibleEducator: true,
        },
      })) || null;
    if (!queryResult) {
      return queryResult;
    }
    return GroupPrismaMapper.toDomain(queryResult);
  }
  async queryGroupsByName(subName: string) {
    const academiesFound =
      (await prismaClient.group.findMany({
        where: {
          name: subName,
        },
        include: {
          memberships: {
            where: {
              role: UserGroupRole.EDUCATOR,
            },
          },
          responsibleEducator: true,
        },
      })) || null;
    return academiesFound.map(GroupPrismaMapper.toDomain);
  }

  async findAll() {
    const queryResult = await prismaClient.group.findMany({
      include: {
        memberships: {
          select: {
            id: true,
          },
        },
        responsibleEducator: true,
      },
    });
    return queryResult.map(GroupPrismaMapper.toDomain);
  }

  async findGroupById(groupId: string) {
    const queryResult = await prismaClient.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        memberships: true,
      },
    });
    if (!queryResult) {
      return null;
    }
    return GroupPrismaMapper.toDomain(queryResult);
  }
}
