import { Group } from "../../entities/group";
import { GroupRepository } from "../group-repository";

import { prismaClient } from "../../database/prisma";
import { UserGroupStatus } from "@prisma/client";

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
        },
      });
      return new Group(
        {
          educatorsIds: [],
          location: createdGroup.location,
          name: createdGroup.name,
          responsibleEducatorId: createdGroup.responsibleEducatorId,
          membersIds: [],
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
        members: {
          where: {
            status: UserGroupStatus.EDUCATOR,
          },
        },
        responsibleEducator: true,
      },
    });
    return new Group(
      {
        educatorsIds: deletedGroup.members.map((educator) => educator.userId),
        location: deletedGroup.location,
        name: deletedGroup.name,
        responsibleEducatorId: deletedGroup.responsibleEducatorId,
        membersIds: [],
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
          members: {
            where: {
              status: UserGroupStatus.EDUCATOR,
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
        educatorsIds: queryResult.members.map((educator) => educator.userId),
        location: queryResult.location,
        name: queryResult.name,
        responsibleEducatorId: queryResult.responsibleEducatorId,
        membersIds: [],
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
          members: {
            where: {
              status: UserGroupStatus.EDUCATOR,
            },
          },
          responsibleEducator: true,
        },
      })) || null;
    return academiesFound.map(
      (group) =>
        new Group(
          {
            educatorsIds: group.members.map((educator) => educator.userId),
            location: group.location,
            name: group.name,
            responsibleEducatorId: group.responsibleEducatorId,
            membersIds: [],
          },
          group.id
        )
    );
  }

  async findAll() {
    const queryResult = await prismaClient.group.findMany({
      include: {
        members: {
          where: {
            status: UserGroupStatus.EDUCATOR,
          },
        },
        responsibleEducator: true,
      },
    });
    return queryResult.map(
      (group) =>
        new Group(
          {
            educatorsIds: group.members.map((educator) => educator.userId),
            location: group.location,
            name: group.name,
            responsibleEducatorId: group.responsibleEducator.id,
            membersIds: [],
          },
          group.id
        )
    );
  }
  async findEducatorsIds(groupId: string) {
    const queryResult = await prismaClient.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: {
          where: {
            status: UserGroupStatus.EDUCATOR,
          },
        },
      },
    });
    return queryResult
      ? queryResult.members.map((educator) => educator.userId)
      : [];
  }

  async findGroupById(groupId: string) {
    const queryResult = await prismaClient.group.findUnique({
      where: {
        id: groupId,
      },
      include: {
        members: {
          where: {
            status: UserGroupStatus.EDUCATOR,
          },
        },
      },
    });
    if (!queryResult) {
      return null;
    }
    return new Group({
      location: queryResult.location,
      name: queryResult.name,
      responsibleEducatorId: queryResult.responsibleEducatorId,
      educatorsIds: queryResult.members.map((educator) => educator.userId),
      membersIds: [],
    });
  }
}
