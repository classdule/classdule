import { Group as PrismaGroup } from "@prisma/client";

import { Group } from "../../../../app/entities/group";

export class GroupPrismaMapper {
  static toPrisma(group: Group): PrismaGroup {
    return {
      id: group.id,
      location: group.location,
      name: group.name,
      responsibleEducatorId: group.responsibleEducatorId,
    };
  }
  static toDomain(raw: PrismaGroup): Group {
    return new Group(
      {
        location: raw.location,
        name: raw.name,
        responsibleEducatorId: raw.responsibleEducatorId,
      },
      raw.id
    );
  }
}
