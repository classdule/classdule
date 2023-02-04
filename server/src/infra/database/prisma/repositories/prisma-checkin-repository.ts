import { isSameDay } from "date-fns";
import { prismaClient } from "../client";
import { Checkin } from "../../../../app/entities/checkin";
import { CheckinPrismaMapper } from "../../../api/mappers/prisma/checkin-prisma-mapper";

import { CheckinRepository } from "../../../../app/repositories/checkin-repository";

export class PrismaCheckinRepository implements CheckinRepository {
  async create(checkin: Checkin) {
    await prismaClient.checkin.create({
      data: {
        classroomId: checkin.classroomId,
        userId: checkin.userId,
      },
    });
  }
  async delete(checkinId: string) {
    await prismaClient.checkin.delete({
      where: {
        id: checkinId,
      },
    });
  }
  async verify(checkinId: string, verify: boolean) {
    await prismaClient.checkin.update({
      where: {
        id: checkinId,
      },
      data: {
        verified: verify,
      },
    });
  }

  async findByUserId(userId: string) {
    const queryResult = await prismaClient.checkin.findMany({
      where: {
        userId: userId,
      },
    });
    return queryResult.map(CheckinPrismaMapper.toDomain);
  }
  async findByDate(date: Date, userId: string) {
    const queryResult = (
      await prismaClient.checkin.findMany({
        where: {
          userId: userId,
        },
      })
    ).filter((checkin) => isSameDay(checkin.createdAt, date));

    return queryResult.map(CheckinPrismaMapper.toDomain);
  }
  async findById(checkinId: string) {
    const foundCheckin = await prismaClient.checkin.findUnique({
      where: {
        id: checkinId,
      },
    });
    if (!foundCheckin) {
      return null;
    }
    return CheckinPrismaMapper.toDomain(foundCheckin);
  }
}
