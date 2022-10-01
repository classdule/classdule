import { Request, Response } from 'express';
import {z} from 'zod'
import { Checkin } from '../entities/checkin';
import { PrismaCheckinRepository } from '../repositories/prisma/prisma-checkin-repository';
import { PrismaClassroomRepository } from '../repositories/prisma/prisma-classroom-repository';
import { CreateCheckin } from '../services/checkin/create-checkin';
import { VerifyCheckin } from '../services/checkin/verify-checkin';

export const createCheckinSchema = z.object({
    body: z.object({
        classroomId: z.string(),
        user: z.object({
            id: z.string()
        })
    })
})
type CreateCheckinSchema = z.TypeOf<typeof createCheckinSchema>
export async function handleCreateCheckin(req:Request<{}, {}, CreateCheckinSchema['body']>, res:Response){
    const {user, classroomId} = req.body;

    const checkinsRepository = new PrismaCheckinRepository();
    const classroomRepository = new PrismaClassroomRepository();
    const createCheckin = new CreateCheckin(classroomRepository, checkinsRepository);

    const queryResult = await createCheckin.do({
        checkin: new Checkin({
            classroomId,
            userId: user.id
        })
    })
    return res.json(queryResult)
}
export const verifyCheckinSchema = z.object({
    body: z.object({
        checkinId: z.string(),
        verify: z.boolean(),
        user: z.object({
            id: z.string()
        })
    })
});
type VerifyCheckinSchema = z.TypeOf<typeof verifyCheckinSchema>
export async function handleVerifyCheckin(req:Request<{}, {}, VerifyCheckinSchema['body']>, res:Response){
    const {checkinId, verify, user} = req.body

    const checkinsRepository = new PrismaCheckinRepository();
    const classroomRepository = new PrismaClassroomRepository();
    const verifyCheckin = new VerifyCheckin(
        checkinsRepository,
        classroomRepository,
        user.id
    );

    const queryResult = await verifyCheckin.do({
        checkinId,
        verify
    })
    return res.json(queryResult)
}