import { Request, Response } from "express";
import { createAcademy, getAcademies } from "../services/academy";

import {z} from 'zod'

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

    const queryResult = await createAcademy(name, responsibleEducatorId, location)
    res.status(201).json(queryResult)
}