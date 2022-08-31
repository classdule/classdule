import { Request, Response } from "express";
import { getGraduations, createGraduation, deleteGraduation } from "../services/graduation";
import {z} from 'zod'

export async function handleGetGraduations(req:Request, res:Response){
    const queryResult = await getGraduations()
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
    const operationResult = await createGraduation(name, value)
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
    const operationResult = await deleteGraduation(id)
    return res.status(200).json(operationResult)
}
