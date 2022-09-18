import { Request, Response } from "express";
import {z} from 'zod'
import { Graduation } from "../entities/graduation";
import { PrismaGraduationRepository } from "../repositories/prisma/prisma-graduation-repository";
import { CreateGraduation } from "../services/graduation/create-graduation";
import { DeleteGraduation } from "../services/graduation/delete-graduation";
import { GetAllGraduations } from "../services/graduation/get-all-graduations";

export async function handleGetGraduations(req:Request, res:Response){
    const graduationRepository = new PrismaGraduationRepository()
    const getGraduations = new GetAllGraduations(graduationRepository)
    const queryResult = await getGraduations.do()
    return res.json(queryResult)
}

export const createGraduationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Belt name is required',
        }),
        value: z.number({
            required_error: 'Belt value is required'
        }).min(0, 'Value must be a non-negative number')
    })
})
type handleCreateGraduationRequestBody = z.TypeOf<typeof createGraduationSchema>['body']
export async function handleCreateGraduation(req:Request<{}, {}, handleCreateGraduationRequestBody>, res:Response){
    const {name, value} = req.body
    const graduationRepository = new PrismaGraduationRepository()
    const createGraduation = new CreateGraduation(graduationRepository)
    const operationResult = await createGraduation.do(new Graduation({
        name,
        value
    }))
    return res.status(201).json(operationResult)
}

export const deleteGraduationSchema = z.object({
    body: z.object({
        id: z.string({
            required_error: 'Graduation id is required'
        })
    })
})
type handleDeleteGraduationRequestBody = z.TypeOf<typeof deleteGraduationSchema>['body']
export async function handleDeleteGraduation(req:Request<{}, {}, handleDeleteGraduationRequestBody>, res:Response){
    const {id} = req.body
    const graduationRepository = new PrismaGraduationRepository()
    const deleteGraduation = new DeleteGraduation(graduationRepository)
    const operationResult = await deleteGraduation.do({
        graduationId: id
    })
    return res.status(200).json(operationResult)
}
