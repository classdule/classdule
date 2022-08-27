import { NextFunction, Request, Response, Router } from "express";
import { getUsers, createUser } from "../services/getUsers";

const mainRoutes = Router()

mainRoutes.get('/', async (req:Request, res:Response, next:NextFunction) => {
    const users = await getUsers()
    res.json(users)
})

mainRoutes.get('/create', async (req:Request, res:Response, next:NextFunction) => {
    await createUser()
    res.json({hello:'world'})
})

export {mainRoutes}