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
      },
      createdUser.id
    );
  }
  async delete(userId: string) {
    const deletedUser = await prismaClient.user.delete({
      where: {
        id: userId,
      },
    });
    return new User(
      {
        birthDay: deletedUser.birthDay,
        name: deletedUser.name,
        password: deletedUser.password,
        email: deletedUser.email,
      },
      deletedUser.id
    );
  }
  async findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!!user) {
      return new User(
        {
          birthDay: user.birthDay,
          name: user.name,
          password: user.password,
          email: user.email,
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
    });
    return new User(
      {
        birthDay: updatedUser.birthDay,
        name: updatedUser.name,
        password: updatedUser.password,
        email: updatedUser.email,
      },
      updatedUser.id
    );
  }

  async findAll() {
    const queryUsers = await prismaClient.user.findMany();
    return queryUsers.map((user) => {
      return new User(
        {
          birthDay: user.birthDay,
          name: user.name,
          password: user.password,
          email: user.email,
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
    });
    return foundUsers.map((user) => {
      return new User(
        {
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
