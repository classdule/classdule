import { prismaClient } from "../database/prisma";
import { isClassroomOpenById } from "./classroom";

export async function getCheckins(){
    const checkins = await prismaClient.checkin.findMany()
    return checkins
}

export async function createCheckin(classroomScheduleId:string, userId:string){
    const isClassroomOpen = await isClassroomOpenById(classroomScheduleId)
    if(isClassroomOpen){
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
        return {
            message:'Check-in created successfully',
            createdCheckin
        }
    }
    return {
        message:'Classroom is closed',
        createdCheckin: null
    }
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