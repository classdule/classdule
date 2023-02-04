import { User as PrismaUser } from "@prisma/client";
import { User } from "../../../../app/entities/user";

export class UserPrismaMapper {
  static toPrisma(user: User): PrismaUser {
    return {
      birthDay: user.birthDay,
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      name: user.name,
      password: user.password,
    };
  }

  static toDomain(raw: PrismaUser): User {
    return new User(
      {
        createdAt: raw.createdAt,
        birthDay: raw.birthDay,
        email: raw.email,
        name: raw.name,
        password: raw.password,
      },
      raw.id
    );
  }
}
