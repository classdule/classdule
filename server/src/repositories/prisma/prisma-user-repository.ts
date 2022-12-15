import { prismaClient } from "../../database/prisma";

import { User } from "../../entities/user";
import { UserPrismaMapper } from "../../mappers/prisma/user-prisma-mapper";
import { UserRepository } from "../user-repository";

export class UserRepositoryPrisma implements UserRepository {
  async create(user: User) {
    await prismaClient.user.create({
      data: {
        name: user.name,
        birthDay: user.birthDay,
        password: user.password,
        email: user.email,
      },
    });
  }
  async delete(userId: string) {
    await prismaClient.user.delete({
      where: {
        id: userId,
      },
    });
  }
  async findByEmail(email: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!!user) {
      return UserPrismaMapper.toDomain(user);
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
    return UserPrismaMapper.toDomain(updatedUser);
  }

  async findAll() {
    const queryUsers = await prismaClient.user.findMany();
    return queryUsers.map(UserPrismaMapper.toDomain);
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
    return UserPrismaMapper.toDomain(foundUser);
  }

  async queryByName(name: string) {
    const foundUsers = await prismaClient.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return foundUsers.map(UserPrismaMapper.toDomain);
  }

  async save(user: User) {
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: UserPrismaMapper.toPrisma(user),
    });
  }
}
