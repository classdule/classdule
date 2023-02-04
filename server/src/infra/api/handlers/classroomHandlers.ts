import "express-async-errors";
import { parseISO } from "date-fns";
import { Request, Response } from "express";
import { z } from "zod";

import { Classroom } from "../../../app/entities/classroom";
import { PrismaClassroomRepository } from "../../../app/repositories/prisma/prisma-classroom-repository";
import { CreateClassroom } from "../../../app/services/classroom/create-classroom";
import { DeleteClassroom } from "../../../app/services/classroom/delete-classroom";
import { GetClassroomsByGroup } from "../../../app/services/classroom/get-classrooms-by-group";
import { PrismaGroupRepository } from "../../../app/repositories/prisma/prisma-group-repository";
import { PrismaMembershipRepository } from "../../../app/repositories/prisma/prisma-membership-repository";
import { ClassroomHttpMapper } from "../mappers/http/classroom-http-mapper";

export const getClassroomsByGroupSchema = z.object({
  query: z.object({
    groupId: z.string(),
  }),
});
type GetClassroomsSchema = z.TypeOf<typeof getClassroomsByGroupSchema>;
export async function handleGetClassroomsByGroup(
  req: Request<{}, {}, {}, GetClassroomsSchema["query"]>,
  res: Response
) {
  const { groupId } = req.query;

  const classroomsRepository = new PrismaClassroomRepository();
  const getClassroomsByGroup = new GetClassroomsByGroup(classroomsRepository);

  const { classrooms } = await getClassroomsByGroup.do({
    groupId: groupId,
  });

  return res.json(classrooms.map(ClassroomHttpMapper.toHttp));
}

export const createClassroomSchema = z.object({
  body: z.object({
    type: z.string(),
    groupId: z.string(),
    endsAt: z.string(),
    startsAt: z.string(),
    content: z.string(),
    weekdays: z.array(z.number().min(0).max(6)),
    user: z.object({
      id: z.string(),
    }),
  }),
});
type CreateClassroomSchema = z.TypeOf<typeof createClassroomSchema>;
export async function handleCreateClassroom(
  req: Request<{}, {}, CreateClassroomSchema["body"]>,
  res: Response
) {
  const { type, groupId, endsAt, startsAt, weekdays, user, content } = req.body;

  const classroomRepository = new PrismaClassroomRepository();
  const groupRepository = new PrismaGroupRepository();
  const membershipRepository = new PrismaMembershipRepository();
  const createClassroom = new CreateClassroom(
    classroomRepository,
    groupRepository,
    membershipRepository, 
  );

  const [parsedStartsAt, parsedEndsAt] = [startsAt, endsAt].map((str) =>
    parseISO(str)
  );

  try {
    const { classroom } = await createClassroom.do({
      groupId: groupId,
      type,
      educatorId: user.id,
      endsAt: parsedEndsAt,
      startsAt: parsedStartsAt,
      weekdays: weekdays as Day[],
      content: content,
      actorId: user.id,
    });

    return res.json(ClassroomHttpMapper.toHttp(classroom));
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.status(400).json({
      error: errMessage,
    });
  }
}

export const deleteClassroomSchema = z.object({
  body: z.object({
    classroomId: z.string(),
  }),
});
type DeleteClassroomSchema = z.TypeOf<typeof deleteClassroomSchema>;
export async function handleDeleteClassroom(
  req: Request<{}, {}, DeleteClassroomSchema["body"]>,
  res: Response
) {
  const { classroomId } = req.body;

  const classroomsRepository = new PrismaClassroomRepository();
  const deleteClassroom = new DeleteClassroom(classroomsRepository);

  await deleteClassroom.do({
    classroomId,
  });
  return res.sendStatus(200);
}
