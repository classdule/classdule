import { prismaClient } from "../../database/prisma";
import { Checkin } from "../../entities/checkin";

import { CheckinRepository } from "../checkin-repository";

export class PrismaCheckinRepository implements CheckinRepository {
    async create(checkin: Checkin){
        const createdCheckin = await prismaClient.checkin.create({
            data: {
                classroomId: checkin.classroomId,
                userId: checkin.userId
            }
        })
        return new Checkin({
            classroomId: createdCheckin.classroomId,
            userId: createdCheckin.userId,
            createdAt: createdCheckin.createdAt,
            verified: createdCheckin.verified
        }, createdCheckin.id)
    }
    async delete(checkinId: string){
        const deletedCheckin = await prismaClient.checkin.delete({
            where: {
                id: checkinId
            }
        })
        if(!deletedCheckin){
            return null
        }
        return new Checkin({
            classroomId: deletedCheckin.classroomId,
            userId: deletedCheckin.userId,
            createdAt: deletedCheckin.createdAt,
            verified: deletedCheckin.verified 
        }, deletedCheckin.id)
    }
    async verify(checkinId: string, verify: boolean){
        const verifiedCheckin = await prismaClient.checkin.update({
            where: {
                id: checkinId
            },
            data: {
                verified: verify
            }
        })
        if(!verifiedCheckin){
            return null
        }
        return new Checkin({
            classroomId: verifiedCheckin.classroomId,
            userId: verifiedCheckin.userId,
            createdAt: verifiedCheckin.createdAt,
            verified: verifiedCheckin.verified
        }, verifiedCheckin.id)
    }
}