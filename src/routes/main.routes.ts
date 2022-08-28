import { NextFunction, Request, Response, Router } from "express";
import { getUsers, createUser } from "../services/user";

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

export {mainRoutes}