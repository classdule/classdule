import { Request, Response } from "express";
import { getAcademies } from "../services/academy";

export async function handleGetAcademies(req:Request, res:Response){
    const queryResult = getAcademies()
    return res.json(queryResult)
}