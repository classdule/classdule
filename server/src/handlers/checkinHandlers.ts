import { Request, Response } from 'express';
import {z} from 'zod'
import { createCheckin } from '../services/checkin';

export const createCheckinSchema = z.object({
    body: z.object({
        classroomScheduleId: z.string(),
        user: z.object({
            name: z.string(),
            id: z.string()
        })
    })
})
type RequestSchema = z.TypeOf<typeof createCheckinSchema>
export async function handleCreateCheckin(req:Request<{}, {}, RequestSchema['body']>, res:Response){
    const {classroomScheduleId, user} = req.body

    const queryResult = await createCheckin(classroomScheduleId, user.id)
    return res.json(queryResult)
}