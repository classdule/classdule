import { query, Request, Response } from 'express';
import {z} from 'zod'
import { createClassroom, createClassroomSchedules, deleteClassroom, getClassroomsByAcademy } from '../services/classroom';

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
        academyName:z.string()
    })
})
type CreateClassroomSchema = z.TypeOf<typeof createClassroomSchema>
export async function handleCreateClassroom(req:Request<{}, {}, CreateClassroomSchema['body']>, res:Response){
    const {type, academyName, educatorId} = req.body
    const queryResult = await  createClassroom(type, academyName, educatorId)
    return res.json(queryResult)
}

export const deleteClassroomSchema = z.object({
    body: z.object({
        classroomId: z.string()
    })
})
type DeleteClassroomSchema = z.TypeOf<typeof deleteClassroomSchema>
export async function handleDeleteClassroom(req:Request<{}, {}, DeleteClassroomSchema['body']>, res:Response){
    const {classroomId} = req.body
    const queryResult = await deleteClassroom(classroomId)
    return res.json(queryResult)
}

export const createClassroomScheduleSchema = z.object({
    body: z.object({
        weekDays: z.array(z.number()),
        startsAt: z.string(),
        endsAt: z.string(),
        classroomId: z.string()
    })
})
type CreateClassroomSchedulesSchema = z.TypeOf<typeof createClassroomScheduleSchema>
export async function handleCreateClassroomSchedules(req:Request<{}, {}, CreateClassroomSchedulesSchema['body']>, res:Response){
    const {weekDays, endsAt, classroomId, startsAt} = req.body
    const parsedStartsAt = new Date(startsAt)
    const parsedEndsAt = new Date(endsAt)
    const queryResult = await createClassroomSchedules(parsedStartsAt, weekDays, classroomId, parsedEndsAt)
    return res.json(queryResult)
}