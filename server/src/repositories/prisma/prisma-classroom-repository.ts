import {areIntervalsOverlapping} from 'date-fns'
import {intersection} from 'lodash'

import { prismaClient } from "../../database/prisma";

import { Classroom } from "../../entities/classroom";
import { ClassroomRepository } from "../classroom-repository";

export class PrismaClassroomRepository implements ClassroomRepository {
    async create (classroom: Classroom) {
        const queryResult = await prismaClient.classroom.create({
            data: {
                startsAt: classroom.startsAt,
                endsAt: classroom.endsAt,
                type: classroom.type,
                academy: {
                    connect: {
                        id: classroom.academyId
                    }
                },
                educator: {
                    connect: {
                        id: classroom.educatorId
                    }
                },
                weekdays: {
                    connectOrCreate: classroom.weekdays.map(weekday => {
                        return {
                            where: {
                                id: classroom.id
                            },
                            create: {
                                weekday: weekday
                            }
                        }
                    })
                },
            },
            include: {
                weekdays: true
            }
        })

        return new Classroom({
            academyId: queryResult.academyId,
            educatorId: queryResult.educatorId,
            endsAt: queryResult.endsAt,
            startsAt: queryResult.startsAt,
            type: queryResult.type,
            weekdays: queryResult.weekdays.map(weekday => weekday.weekday as Day)
        }, queryResult.id)
    }
    async delete (classroomId: string) {
        const deletedClassroom = await prismaClient.classroom.delete({
            where: {
                id: classroomId
            },
            include: {
                weekdays: true
            }
        })
        return new Classroom({
            academyId: deletedClassroom.academyId,
            educatorId: deletedClassroom.educatorId,
            endsAt: deletedClassroom.endsAt,
            startsAt: deletedClassroom.startsAt,
            type: deletedClassroom.type,
            weekdays: deletedClassroom.weekdays.map(weekday => weekday.weekday as Day)
        })

    }
    async findOverlappingDateClassroom (start: Date, end: Date, weekdays: Day[], academyId: string) {
        const allAcademiesClassrooms = (await prismaClient.classroom.findMany({
            where: {
                academyId: academyId,
            },
            include: {
                weekdays: true,
            }
        })).filter(classroom => intersection(
            classroom.weekdays.map(weekday => weekday.weekday),
            weekdays
        ).length > 0)
        const overlappingClassroom = allAcademiesClassrooms.find(classroom => {
            return areIntervalsOverlapping(
                {
                    start: start,
                    end:end
                },
                {
                    start: classroom.startsAt,
                    end: classroom.endsAt
                }
            )
        })
        if(!overlappingClassroom){
            return null
        }
        return new Classroom({
            academyId: overlappingClassroom.academyId,
            educatorId: overlappingClassroom.educatorId,
            endsAt: overlappingClassroom.endsAt,
            startsAt: overlappingClassroom.startsAt,
            type: overlappingClassroom.type,
            weekdays: overlappingClassroom.weekdays.map(weekday => weekday.weekday as Day)
        }, overlappingClassroom.id)
    }
    async findById (classroomId: string) {
        const foundClassroom = await prismaClient.classroom.findUnique({
            where: {
                id: classroomId
            },
            include: {
                weekdays: true
            }
        })
        if(!foundClassroom){
            return null
        }
        return new Classroom({
            academyId: foundClassroom.academyId,
            educatorId: foundClassroom.educatorId,
            endsAt: foundClassroom.endsAt,
            startsAt: foundClassroom.startsAt,
            type: foundClassroom.type,
            weekdays: foundClassroom.weekdays.map(weekday => weekday.weekday as Day)
        })
    }
    async findByAcademy (academyId: string) {
        const academyClassrooms = await prismaClient.classroom.findMany({
            where: {
                academyId: academyId
            },
            include: {
                weekdays: true
            }
        })
        return academyClassrooms.map(classroom => {
            return new Classroom({
                academyId: classroom.academyId,
                educatorId: classroom.educatorId,
                endsAt: classroom.endsAt,
                startsAt: classroom.startsAt,
                type: classroom.type,
                weekdays: classroom.weekdays.map(weekday => weekday.weekday as Day)
            }, classroom.id)
        })
    }

}