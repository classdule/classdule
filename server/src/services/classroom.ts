import { Prisma } from "@prisma/client";
import { prismaClient } from "../database/prisma";

export async function getClassroomsByAcademy(name:string){
    const queryResult = await prismaClient.classroom.findMany({
        where: {
            academy: {
                name: name
            }
        },
        include: {
            schedule: true
        }
    })
    return queryResult
}

export async function createClassroom(type:string, academyName:string, educatorId:string){
    const createdClassroom = await prismaClient.classroom.create({
        data: {
            type: type,
            academy: {
                connect: {
                    name: academyName
                }
            },
            educator: {
                connect: {
                    id: educatorId
                }
            },
        }
    })
    return createdClassroom
}

export async function deleteClassroom(classroomId:string){
    const deletedClassroom = await prismaClient.classroom.delete({
        where: {
            id: classroomId
        }
    })
    return deletedClassroom
}

export async function createClassroomSchedules(startsAt: Date, weekDays: number[], classroomId:string, endsAt: Date){
    const createdSchedules = await prismaClient.classroomSchedule.createMany({
        data: weekDays.map(weekDay => {
            return {
                startsAt,
                weekDay,
                classroomId,
                endsAt
            }
        })
    })
    return createdSchedules
}

export function isClassroomOpen(
    classroom: Prisma.ClassroomScheduleGetPayload<{}>,
    currentDate = new Date()
) {
    const currentWeekday = currentDate.getDay()
    return currentWeekday === classroom.weekDay
}

export async function isClassroomOpenById(classroomScheduleId: string){
    const currentClassroom = await prismaClient.classroomSchedule.findUnique({
        where: {
            id: classroomScheduleId
        }
    })
    if(!currentClassroom){
        return false
    }
    const isOpen = isClassroomOpen(currentClassroom)
    return isOpen
}