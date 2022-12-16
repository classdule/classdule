import { Classroom as PrismaClassroom, ClassroomWeekday } from "@prisma/client";
import { Day } from "date-fns";
import { Classroom } from "../../entities/classroom";

export class ClassroomPrismaMapper {
  static toPrisma(classroom: Classroom): PrismaClassroom {
    return {
      educatorId: classroom.educatorId,
      endsAt: classroom.endsAt,
      groupId: classroom.groupId,
      id: classroom.id,
      startsAt: classroom.startsAt,
      type: classroom.type,
      content: classroom.content,
    };
  }

  static toDomain(
    raw: PrismaClassroom & {
      weekdays: ClassroomWeekday[];
    }
  ): Classroom {
    return new Classroom(
      {
        content: raw.content,
        educatorId: raw.educatorId,
        endsAt: raw.endsAt,
        groupId: raw.groupId,
        startsAt: raw.startsAt,
        type: raw.type,
        weekdays: raw.weekdays.map((weekday) => weekday.weekday) as Day[],
      },
      raw.id
    );
  }
}
