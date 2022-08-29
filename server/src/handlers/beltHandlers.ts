import { Request, Response } from "express";
import { getBelts } from "../services/belt";

export async function handleGetBelts(req:Request, res:Response){
    const queryResult = await getBelts()
    return res.json(queryResult)
}