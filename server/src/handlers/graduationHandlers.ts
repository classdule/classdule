import { Request, Response } from "express";
import { getGraduations, createGraduation } from "../services/graduation";

export async function handleGetGraduations(req:Request, res:Response){
    const queryResult = await getGraduations()
    return res.json(queryResult)
}

export async function handleCreateGraduation(req:Request, res:Response){
    const {name, value} = req.body
    const operationResult = await createGraduation(name, value)
    return res.status(201).json(operationResult)
}
export async function handleDeleteGraduation(req:Request, res:Response){
    const {id} = req.body
    const operationResult = await createGraduation('name', 0)
    return res.status(201).json(operationResult)
}
