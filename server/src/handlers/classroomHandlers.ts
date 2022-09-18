import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import {z} from 'zod'
import { Classroom } from '../entities/classroom';
import { PrismaClassroomRepository } from '../repositories/prisma/prisma-classroom-repository';
import { deleteClassroom, getClassroomsByAcademy } from '../services/classroom';
import { CreateClassroom } from '../services/classroom/create-classroom';

export const getClassroomsByAcademySchema = z.object({
    query: z.object({
        name: z.string()
    })
})
type GetClassroomsSchema = z.TypeOf<typeof getClassroomsByAcademySchema>
export async function handleGetClassroomsByAcademy(req:Request<{}, {}, {}, GetClassroomsSchema['query']>, res:Response){
    const {name} = req.query
    const queryResult = await getClassroomsByAcademy(name)
    return res.json(queryResult)
}

export const createClassroomSchema = z.object({
    body: z.object({
        type: z.string(),
        educatorId: z.string(),
        academyId:z.string(),
        endsAt: z.string(),
        startsAt: z.string(),
        weekdays: z.array(z.number())
    })
})
type CreateClassroomSchema = z.TypeOf<typeof createClassroomSchema>
export async function handleCreateClassroom(req:Request<{}, {}, CreateClassroomSchema['body']>, res:Response){
    const {type, academyId, educatorId, endsAt, startsAt, weekdays} = req.body
    const classroomRepository = new PrismaClassroomRepository();
    const createClassroom = new CreateClassroom(classroomRepository);

    const queryResult = await createClassroom.do(new Classroom({
        academyId,
        type,
        educatorId,
        endsAt: parseISO(endsAt),
        startsAt: parseISO(startsAt),
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

    const queryResult = await deleteClassroom(classroomId)
    return res.json(queryResult)
}