import { Request, Response } from "express";
import { z } from "zod";
import { Checkin } from "../entities/checkin";
import { CheckinHttpMapper } from "../mappers/http/checkin-http-mapper";
import { PrismaCheckinRepository } from "../repositories/prisma/prisma-checkin-repository";
import { PrismaClassroomRepository } from "../repositories/prisma/prisma-classroom-repository";
import { PrismaGroupRepository } from "../repositories/prisma/prisma-group-repository";
import { PrismaMembershipRepository } from "../repositories/prisma/prisma-membership-repository";
import { CreateCheckin } from "../services/checkin/create-checkin";
import { VerifyCheckin } from "../services/checkin/verify-checkin";

export const createCheckinSchema = z.object({
  body: z.object({
    classroomId: z.string(),
    user: z.object({
      id: z.string(),
    }),
  }),
});
type CreateCheckinSchema = z.TypeOf<typeof createCheckinSchema>;
export async function handleCreateCheckin(
  req: Request<{}, {}, CreateCheckinSchema["body"]>,
  res: Response
) {
  const { user, classroomId } = req.body;

  const checkinsRepository = new PrismaCheckinRepository();
  const classroomRepository = new PrismaClassroomRepository();
  const groupRepository = new PrismaGroupRepository();
  const membershipRepository = new PrismaMembershipRepository();
  const createCheckin = new CreateCheckin(
    classroomRepository,
    checkinsRepository,
    groupRepository,
    membershipRepository
  );

  try {
    const { checkin } = await createCheckin.do({
      classroomId,
      userId: user.id,
    });
    return res.json(CheckinHttpMapper.toHttp(checkin));
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.status(400).json({
      error: errMessage,
    });
  }
}
export const verifyCheckinSchema = z.object({
  body: z.object({
    checkinId: z.string(),
    verify: z.boolean(),
    user: z.object({
      id: z.string(),
    }),
  }),
});
type VerifyCheckinSchema = z.TypeOf<typeof verifyCheckinSchema>;
export async function handleVerifyCheckin(
  req: Request<{}, {}, VerifyCheckinSchema["body"]>,
  res: Response
) {
  const { checkinId, verify, user } = req.body;

  const checkinsRepository = new PrismaCheckinRepository();
  const classroomRepository = new PrismaClassroomRepository();
  const verifyCheckin = new VerifyCheckin(
    checkinsRepository,
    classroomRepository,
    user.id
  );
  try {
    await verifyCheckin.do({
      checkinId,
      verify,
    });
    return res.sendStatus(200);
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.status(400).json({
      error: errMessage,
    });
  }
}
