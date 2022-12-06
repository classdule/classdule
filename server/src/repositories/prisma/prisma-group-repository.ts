import { Group } from "../../entities/group";
import { GroupRepository } from "../group-repository";

import { prismaClient } from "../../database/prisma";

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
        educators: true,
        responsibleEducator: true,
      },
    });
    return new Group(
      {
        educatorsIds: deletedGroup.educators.map((educator) => educator.id),
        location: deletedGroup.location,
        name: deletedGroup.name,
        responsibleEducatorId: deletedGroup.responsibleEducatorId,
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
          educators: true,
          responsibleEducator: true,
        },
      })) || null;
    if (!queryResult) {
      return queryResult;
    }
    return new Group(
      {
        educatorsIds: queryResult.educators.map((educator) => educator.id),
        location: queryResult.location,
        name: queryResult.name,
        responsibleEducatorId: queryResult.responsibleEducatorId,
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
          educators: true,
          responsibleEducator: true,
        },
      })) || null;
    return academiesFound.map(
      (group) =>
        new Group(
          {
            educatorsIds: group.educators.map((educator) => educator.id),
            location: group.location,
            name: group.name,
            responsibleEducatorId: group.responsibleEducatorId,
          },
          group.id
        )
    );
  }

  async findAll() {
    const queryResult = await prismaClient.group.findMany({
      include: {
        educators: true,
        responsibleEducator: true,
      },
    });
    return queryResult.map(
      (group) =>
        new Group(
          {
            educatorsIds: group.educators.map((educator) => educator.id),
            location: group.location,
            name: group.name,
            responsibleEducatorId: group.responsibleEducator.id,
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
        educators: true,
      },
    });
    return queryResult
      ? queryResult.educators.map((educator) => educator.id)
      : [];
  }
}
