import { areIntervalsOverlapping } from "date-fns";
import { intersection } from "lodash";

import { prismaClient } from "../../database/prisma";

import { Classroom } from "../../entities/classroom";
import { ClassroomRepository } from "../classroom-repository";

export class PrismaClassroomRepository implements ClassroomRepository {
  async create(classroom: Classroom) {
    const queryResult = await prismaClient.classroom.create({
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
        content: {
          connectOrCreate: classroom.content.map((cont) => {
            return {
              where: {
                content: cont,
              },
              create: {
                content: cont,
              },
            };
          }),
        },
      },
      include: {
        weekdays: true,
        content: true,
      },
    });
    return new Classroom(
      {
        groupId: queryResult.groupId,
        educatorId: queryResult.educatorId,
        endsAt: queryResult.endsAt,
        startsAt: queryResult.startsAt,
        type: queryResult.type,
        weekdays: queryResult.weekdays.map((weekday) => weekday.weekday as Day),
        content: queryResult.content.map((cont) => cont.content),
      },
      queryResult.id
    );
  }
  async delete(classroomId: string) {
    const deletedClassroom = await prismaClient.classroom.delete({
      where: {
        id: classroomId,
      },
      include: {
        weekdays: true,
        content: true,
      },
    });
    return new Classroom({
      groupId: deletedClassroom.groupId,
      educatorId: deletedClassroom.educatorId,
      endsAt: deletedClassroom.endsAt,
      startsAt: deletedClassroom.startsAt,
      type: deletedClassroom.type,
      weekdays: deletedClassroom.weekdays.map(
        (weekday) => weekday.weekday as Day
      ),
      content: deletedClassroom.content.map((cont) => cont.content),
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
          content: true,
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
    return new Classroom(
      {
        groupId: overlappingClassroom.groupId,
        educatorId: overlappingClassroom.educatorId,
        endsAt: overlappingClassroom.endsAt,
        startsAt: overlappingClassroom.startsAt,
        type: overlappingClassroom.type,
        weekdays: overlappingClassroom.weekdays.map(
          (weekday) => weekday.weekday as Day
        ),
        content: overlappingClassroom.content.map((cont) => cont.content),
      },
      overlappingClassroom.id
    );
  }
  async findById(classroomId: string) {
    const foundClassroom = await prismaClient.classroom.findUnique({
      where: {
        id: classroomId,
      },
      include: {
        weekdays: true,
        content: true,
      },
    });
    if (!foundClassroom) {
      return null;
    }
    return new Classroom({
      groupId: foundClassroom.groupId,
      educatorId: foundClassroom.educatorId,
      endsAt: foundClassroom.endsAt,
      startsAt: foundClassroom.startsAt,
      type: foundClassroom.type,
      weekdays: foundClassroom.weekdays.map(
        (weekday) => weekday.weekday as Day
      ),
      content: foundClassroom.content.map((cont) => cont.content),
    });
  }
  async findByGroup(groupId: string) {
    const academyClassrooms = await prismaClient.classroom.findMany({
      where: {
        groupId: groupId,
      },
      include: {
        weekdays: true,
        content: true,
      },
    });
    return academyClassrooms.map((classroom) => {
      return new Classroom(
        {
          groupId: classroom.groupId,
          educatorId: classroom.educatorId,
          endsAt: classroom.endsAt,
          startsAt: classroom.startsAt,
          type: classroom.type,
          weekdays: classroom.weekdays.map((weekday) => weekday.weekday as Day),
          content: classroom.content.map((cont) => cont.content),
        },
        classroom.id
      );
    });
  }
}
