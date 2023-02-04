import { Checkin as PrismaCheckin } from "@prisma/client";

import { Checkin } from "../../../../app/entities/checkin";

export class CheckinPrismaMapper {
  static toPrisma(checkin: Checkin): PrismaCheckin {
    return {
      classroomId: checkin.classroomId,
      createdAt: checkin.createdAt,
      id: checkin.id,
      userId: checkin.userId,
      verified: checkin.verified,
    };
  }

  static toDomain(raw: PrismaCheckin): Checkin {
    return new Checkin(
      {
        classroomId: raw.classroomId,
        userId: raw.userId,
        createdAt: raw.createdAt,
        verified: raw.verified,
      },
      raw.id
    );
  }
}
