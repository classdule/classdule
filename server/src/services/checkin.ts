import { prismaClient } from "../database/prisma";

export async function getCheckins(){
    const checkins = await prismaClient.checkin.findMany()
    return checkins
}

export async function createCheckin(classroomScheduleId:string, userId:string){
    const createdCheckin = await prismaClient.checkin.create({
        data: {
            ClassroomSchedule: {
                connect: {
                    id: classroomScheduleId
                }
            },
            User: {
                connect: {
                    id: userId
                }
            },
        }
    })
    return createdCheckin
}

export async function verifyCheckin(checkinId: string, verify: boolean){
    const verifiedCheckin = await prismaClient.checkin.update({
        data: {
            verified: verify
        },
        where: {
            id: checkinId
        }
    })
    return verifiedCheckin
}