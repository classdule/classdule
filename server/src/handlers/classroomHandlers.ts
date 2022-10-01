import { parseISO, parse } from 'date-fns';
import { Request, Response } from 'express';
import {z} from 'zod'

import 'express-async-errors'

import { Classroom } from '../entities/classroom';
import { PrismaClassroomRepository } from '../repositories/prisma/prisma-classroom-repository';
import { CreateClassroom } from '../services/classroom/create-classroom';
import { DeleteClassroom } from '../services/classroom/delete-classroom';
import { GetClassroomsByAcademy } from '../services/classroom/get-classrooms-by-academy';
import { PrismaAcademyRepository } from '../repositories/prisma/prisma-academy-repository';

export const getClassroomsByAcademySchema = z.object({
    query: z.object({
        academyId: z.string()
    })
})
type GetClassroomsSchema = z.TypeOf<typeof getClassroomsByAcademySchema>
export async function handleGetClassroomsByAcademy(req:Request<{}, {}, {}, GetClassroomsSchema['query']>, res:Response){
    const {academyId} = req.query

    const classroomsRepository = new PrismaClassroomRepository()
    const getClassroomsByAcademy = new GetClassroomsByAcademy(classroomsRepository)

    const queryResult = await getClassroomsByAcademy.do({
        academyId,
    })

    return res.json(queryResult)
}

export const createClassroomSchema = z.object({
    body: z.object({
        type: z.string(),
        educatorId: z.string(),
        academyId:z.string(),
        endsAt: z.string(),
        startsAt: z.string(),
        weekdays: z.array(z.number().min(0).max(6)),
        user: z.object({
            id: z.string()
        })
    })
})
type CreateClassroomSchema = z.TypeOf<typeof createClassroomSchema>
export async function handleCreateClassroom(req:Request<{}, {}, CreateClassroomSchema['body']>, res:Response){
    const {
        type, 
        academyId, 
        educatorId, 
        endsAt, 
        startsAt, 
        weekdays,
        user
    } = req.body

    const classroomRepository = new PrismaClassroomRepository();
    const academyRepository = new PrismaAcademyRepository();
    const createClassroom = new CreateClassroom(
        classroomRepository,
        academyRepository,
        user.id
    );

    const [parsedStartsAt, parsedEndsAt] = [startsAt, endsAt].map(str => parseISO(str))

    const queryResult = await createClassroom.do(new Classroom({
        academyId,
        type,
        educatorId,
        endsAt: parsedEndsAt,
        startsAt: parsedStartsAt,
        weekdays: weekdays as Day[]
    }))

    return res.json(queryResult);
}

export const deleteClassroomSchema = z.object({
    body: z.object({
        classroomId: z.string()
    })
})
type DeleteClassroomSchema = z.TypeOf<typeof deleteClassroomSchema>
export async function handleDeleteClassroom(req:Request<{}, {}, DeleteClassroomSchema['body']>, res:Response){
    const {classroomId} = req.body;

    const classroomsRepository = new PrismaClassroomRepository()
    const deleteClassroom = new DeleteClassroom(classroomsRepository)

    const queryResult = await deleteClassroom.do({
        classroomId
    })
    return res.json(queryResult)
}