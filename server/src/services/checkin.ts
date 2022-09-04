import { prismaClient } from "../database/prisma";

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