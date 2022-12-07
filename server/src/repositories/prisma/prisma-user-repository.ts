import { isThisQuarter } from "date-fns";
import { prismaClient } from "../../database/prisma";

import { User } from "../../entities/user";
import { UserRepositoryBase } from "../user-repository";

export class UserRepositoryPrisma implements UserRepositoryBase {
  async create(user: User) {
    const createdUser = await prismaClient.user.create({
      data: {
        name: user.name,
        birthDay: user.birthDay,
        password: user.password,
        email: user.email,
      },
    });
    return new User(
      {
        birthDay: createdUser.birthDay,
        name: createdUser.name,
        password: createdUser.password,
        email: createdUser.email,
        groupIds: [],
      },
      createdUser.id
    );
  }
  async delete(userId: string) {
    const deletedUser = await prismaClient.user.delete({
      where: {
        id: userId,
      },
      include: {
        groups: {
          select: {
            id: true,
          },
        },
      },
    });
    return new User(
      {
        birthDay: deletedUser.birthDay,
        name: deletedUser.name,
        password: deletedUser.password,
        email: deletedUser.email,
        groupIds: deletedUser.groups.map((gr) => gr.id),
      },
      deletedUser.id
    );
  }
  async findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
      include: {
        groups: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!!user) {
      return new User(
        {
          birthDay: user.birthDay,
          name: user.name,
          password: user.password,
          email: user.email,
          groupIds: user.groups.map((gr) => gr.id),
        },
        user.id
      );
    }
    return null;
  }
  async changeUserName(userId: string, username: string) {
    const updatedUser = await prismaClient.user.update({
      data: {
        name: username,
      },
      where: {
        id: userId,
      },
      include: {
        groups: {
          select: {
            id: true,
          },
        },
      },
    });
    return new User(
      {
        birthDay: updatedUser.birthDay,
        name: updatedUser.name,
        password: updatedUser.password,
        email: updatedUser.email,
        groupIds: updatedUser.groups.map((gr) => gr.id),
      },
      updatedUser.id
    );
  }

  async findAll() {
    const queryUsers = await prismaClient.user.findMany({
      include: {
        groups: {
          select: {
            id: true,
          },
        },
      },
    });
    return queryUsers.map((user) => {
      return new User(
        {
          birthDay: user.birthDay,
          name: user.name,
          password: user.password,
          email: user.email,
          groupIds: user.groups.map((grp) => grp.id),
        },
        user.id
      );
    });
  }

  async findById(userId: string) {
    const foundUser =
      (await prismaClient.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          groups: {
            select: {
              id: true,
            },
          },
        },
      })) ?? null;
    if (!foundUser) {
      return null;
    }
    return new User(
      {
        birthDay: foundUser.birthDay,
        name: foundUser.name,
        password: foundUser.password,
        email: foundUser.email,
        groupIds: foundUser.groups.map((grp) => grp.id),
      },
      foundUser.id
    );
  }

  async queryByName(name: string) {
    const foundUsers = await prismaClient.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        groups: {
          select: {
            id: true,
          },
        },
      },
    });
    return foundUsers.map((user) => {
      return new User(
        {
          groupIds: user.groups.map((grp) => grp.id),
          birthDay: user.birthDay,
          email: user.email,
          name: user.name,
          password: user.password,
        },
        user.id
      );
    });
  }
}
