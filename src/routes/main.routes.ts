import { NextFunction, Request, Response, Router } from "express";
import { prismaClient } from "../database/prisma";
import { getUsers, createUser, createGraduation } from "../services/user";

const mainRoutes = Router()

mainRoutes.get('/', async (req:Request, res:Response, next:NextFunction) => {
    const users = await getUsers()
    res.json(users)
})

mainRoutes.get('/create', async (req:Request, res:Response, next:NextFunction) => {
    await createUser('Gabs', new Date(), 1)
    res.json({hello:'world'})
})
mainRoutes.post('/belt/create', async (req:Request, res:Response, next:NextFunction) => {
    const {name} = req.body
    createGraduation(name)
    return res.json({message:'created'})
})
mainRoutes.get('/belt', async (req:Request, res:Response, next:NextFunction) => {
    const belts = await prismaClient.belt.findMany()
    return res.json({belts})
})

export {mainRoutes}