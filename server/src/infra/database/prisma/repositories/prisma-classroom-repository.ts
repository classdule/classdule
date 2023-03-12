import { areIntervalsOverlapping } from "date-fns";
import { intersection } from "lodash";

import { prismaClient } from "../client";

import { Classroom } from "../../../../app/entities/classroom";
import { ClassroomPrismaMapper } from "../mappers/classroom-prisma-mapper";
import { ClassroomRepository } from "../../../../app/repositories/classroom-repository";

export class PrismaClassroomRepository implements ClassroomRepository {
  async create(classroom: Classroom) {
    await prismaClient.classroom.create({
      data: {
        startsAt: classroom.startsAt,
        endsAt: classroom.endsAt,
        type: classroom.type,
        group: {
          connect: {
            id: classroom.groupId,
          },
        },
        educator: {
          connect: {
            id: classroom.educatorId,
          },
        },
        weekdays: {
          connectOrCreate: classroom.weekdays.map((weekday) => {
            return {
              where: {
                weekday: weekday,
              },
              create: {
                weekday: weekday,
              },
            };
          }),
        },
        content: classroom.content,
      },
      include: {
        weekdays: true,
      },
    });
  }
  async delete(classroomId: string) {
    await prismaClient.classroom.delete({
      where: {
        id: classroomId,
      },
    });
  }
  async findOverlappingDateClassroom(
    start: Date,
    end: Date,
    weekdays: Day[],
    groupId: string
  ) {
    const allAcademiesClassrooms = (
      await prismaClient.classroom.findMany({
        where: {
          groupId: groupId,
        },
        include: {
          weekdays: true,
        },
      })
    ).filter(
      (classroom) =>
        intersection(
          classroom.weekdays.map((weekday) => weekday.weekday),
          weekdays
        ).length > 0
    );
    const overlappingClassroom = allAcademiesClassrooms.find((classroom) => {
      return areIntervalsOverlapping(
        {
          start: start,
          end: end,
        },
        {
          start: classroom.startsAt,
          end: classroom.endsAt,
        }
      );
    });
    if (!overlappingClassroom) {
      return null;
    }
    return ClassroomPrismaMapper.toDomain(overlappingClassroom);
  }
  async findById(classroomId: string) {
    const foundClassroom = await prismaClient.classroom.findUnique({
      where: {
        id: classroomId,
      },
      include: {
        weekdays: true,
      },
    });
    if (!foundClassroom) {
      return null;
    }
    return ClassroomPrismaMapper.toDomain(foundClassroom);
  }
  async findByGroup(groupId: string) {
    const academyClassrooms = await prismaClient.classroom.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        weekdays: true,
      },
    });
    return academyClassrooms.map(ClassroomPrismaMapper.toDomain);
  }
}
