import { Group } from "../../entities/group";
import { GroupRepository } from "../group-repository";

import { prismaClient } from "../../database/prisma";
import { UserGroupRole } from "@prisma/client";

export class PrismaGroupRepository implements GroupRepository {
  async create(group: Group) {
    try {
      const createdGroup = await prismaClient.group.create({
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
      return new Group(
        {
          location: createdGroup.location,
          name: createdGroup.name,
          responsibleEducatorId: createdGroup.responsibleEducatorId,
          membershipsIds: createdGroup.memberships.map(
            (membership) => membership.id
          ),
        },
        createdGroup.id
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        return {
          message: "Could not create a new user",
          error: err.name,
        };
      }
      return null;
    }
  }
  async delete(groupId: string) {
    const deletedGroup = await prismaClient.group.delete({
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
    return new Group(
      {
        location: deletedGroup.location,
        name: deletedGroup.name,
        responsibleEducatorId: deletedGroup.responsibleEducatorId,
        membershipsIds: deletedGroup.memberships.map(
          (membership) => membership.id
        ),
      },
      deletedGroup.id
    );
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
    return new Group(
      {
        location: queryResult.location,
        name: queryResult.name,
        responsibleEducatorId: queryResult.responsibleEducatorId,
        membershipsIds: queryResult.memberships.map(
          (membership) => membership.id
        ),
      },
      queryResult.id
    );
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
    return academiesFound.map(
      (group) =>
        new Group(
          {
            location: group.location,
            name: group.name,
            responsibleEducatorId: group.responsibleEducatorId,
            membershipsIds: group.memberships.map(
              (membership) => membership.id
            ),
          },
          group.id
        )
    );
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
    return queryResult.map(
      (group) =>
        new Group(
          {
            location: group.location,
            name: group.name,
            responsibleEducatorId: group.responsibleEducator.id,
            membershipsIds: group.memberships.map(
              (membership) => membership.id
            ),
          },
          group.id
        )
    );
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
    return new Group({
      location: queryResult.location,
      name: queryResult.name,
      responsibleEducatorId: queryResult.responsibleEducatorId,
      membershipsIds: queryResult.memberships.map(
        (membership) => membership.id
      ),
    });
  }
}
