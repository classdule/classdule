import { Request, Response } from "express";
import { getAcademies } from "../services/academy";

import {z} from 'zod'
import { CreateAcademy } from "../services/academy/create-academy";
import { PrismaAcademyRepository } from "../repositories/prisma/prisma-academy-repository";
import { Academy } from "../entities/academy";

export async function handleGetAcademies(req:Request, res:Response){
    const queryResult = await getAcademies()
    return res.json(queryResult)
}

export const createAcademySchema = z.object({
    body: z.object({
        name: z.string(),
        responsibleEducatorId: z.string(),
        location: z.string()
    })
})
type createAcademyRequestBody = z.TypeOf<typeof createAcademySchema>['body']
export async function handleCreateAcademy(req:Request<{}, {}, createAcademyRequestBody>, res:Response){
    const {location, name, responsibleEducatorId} = req.body

    const repository = new PrismaAcademyRepository()
    const createAcademy = new CreateAcademy(repository)

    const queryResult = await createAcademy.execute({
        location: location,
        name: name,
        responsibleEducatorId: responsibleEducatorId
    })
    res.status(201).json(queryResult)
}