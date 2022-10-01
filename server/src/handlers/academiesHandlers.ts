import { Request, Response } from "express";

import {z} from 'zod'
import { CreateAcademy } from "../services/academy/create-academy";
import { PrismaAcademyRepository } from "../repositories/prisma/prisma-academy-repository";
import { GetAllAcademies } from "../services/academy/get-all-academies";

export async function handleGetAcademies(req:Request, res:Response){
    const academiesRepository = new PrismaAcademyRepository();
    const getAllAcademies = new GetAllAcademies(academiesRepository)
    const queryResult = await getAllAcademies.do()
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
    const {location, name, responsibleEducatorId} = req.body;

    const repository = new PrismaAcademyRepository();
    const createAcademy = new CreateAcademy(repository);

    try{
        const queryResult = await createAcademy.execute({
            location: location,
            name: name,
            responsibleEducatorId: responsibleEducatorId
        });
        res.status(201).json(queryResult);
    }catch(err){
        let errMessage = 'Unknown error';
        if(err instanceof Error) errMessage = err.message;
        return res.json({
            error: errMessage
        });
    }
}