import { Request, Response } from 'express';
import {z} from 'zod'
import { createCheckin, getCheckins, verifyCheckin } from '../services/checkin';

export async function handleGetCheckins(req:Request, res:Response){
    const queryResult = await getCheckins()
    return res.json(queryResult)
}

export const createCheckinSchema = z.object({
    body: z.object({
        classroomScheduleId: z.string(),
        user: z.object({
            name: z.string(),
            id: z.string()
        })
    })
})
type CreateCheckinSchema = z.TypeOf<typeof createCheckinSchema>
export async function handleCreateCheckin(req:Request<{}, {}, CreateCheckinSchema['body']>, res:Response){
    const {classroomScheduleId, user} = req.body

    const queryResult = await createCheckin(classroomScheduleId, user.id)
    return res.json(queryResult)
}
export const verifyCheckinSchema = z.object({
    body: z.object({
        checkinId: z.string(),
        verify: z.boolean()
    })
})
type VerifyCheckinSchema = z.TypeOf<typeof verifyCheckinSchema>
export async function handleVerifyCheckin(req:Request<{}, {}, VerifyCheckinSchema['body']>, res:Response){
    const {checkinId, verify} = req.body
    const queryResult = await verifyCheckin(checkinId, verify)
    return res.json(queryResult)
}