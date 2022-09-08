import { addDays } from 'date-fns'
import { prismaClient } from "../database/prisma";
import { isClassroomOpenById } from "./classroom";

export async function getCheckins(){
    const checkins = await prismaClient.checkin.findMany()
    return checkins
}

export async function createCheckin(classroomScheduleId:string, userId:string){
    const isClassroomOpen = await isClassroomOpenById(classroomScheduleId)
    const isCheckinAlreadyCreated = await isCheckinAlreadyMade(userId, classroomScheduleId)
    if(isCheckinAlreadyCreated){
        return {
            message: 'Check-in already created',
            createCheckin: null
        }
    }
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

export async function isCheckinAlreadyMade(
    userId: string,
    classroomScheduleId: string,
    currentDate = new Date()
){
    const checkin = await prismaClient.checkin.findFirst({
        where: {
            createdAt: {
                lt: addDays(currentDate, 1)
            },
            userId: userId,
            classroomScheduleId
        }
    })
    return !!checkin
}