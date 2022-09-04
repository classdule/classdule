import { Request, Response } from 'express';
import {z} from 'zod'
import { createClassroom, getClassroomsByAcademy } from '../services/classroom';

export const getClassroomsByAcademySchema = z.object({
    query: z.object({
        name: z.string()
    })
})
type getClassroomsRequest = z.TypeOf<typeof getClassroomsByAcademySchema>['query']
export async function handleGetClassroomByAcademy(req:Request<{}, {}, {}, getClassroomsRequest>, res:Response){
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
type createClassroomRequest = z.TypeOf<typeof createClassroomSchema>['body']
export async function handleCreateClassroom(req:Request<{}, {}, createClassroomRequest>, res:Response){
    const {type, academyName, educatorId} = req.body
    const queryResult = await  createClassroom(type, academyName, educatorId)
    return res.json(queryResult)
}

export const createClassroomScheduleSchema = z.object({
    body: z.object({
        weekDay: z.number(),

    })
})

type createClassroomRequestBody = z.TypeOf<typeof createClassroomScheduleSchema>['body']
export async function handleCreateClassroomSchedule(req:Request<{}, {}, createClassroomRequestBody>, res:Response){
    const {weekDay} = req.body
}