import { NextFunction, Request, Response, Router } from "express";
import { prismaClient } from "../database/prisma";
import { getUsers, createUser, createGraduation } from "../services/user";

const mainRoutes = Router()

mainRoutes.get('/users', async (req:Request, res:Response, next:NextFunction) => {
    const users = await getUsers()
    res.json(users)
})

mainRoutes.post('/user/create', async (req:Request, res:Response, next:NextFunction) => {
    const {name, password} = req.body
    const createdUser = await createUser(name, new Date(), 1, password)
    res.json({hello:'world', createdUser})
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