import { NextFunction, Request, Response, Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getUsers, createUser } from "../services/user";

const mainRoutes = Router()

mainRoutes.get('/users', async (req:Request, res:Response, next:NextFunction) => {
    const users = await getUsers()
    res.json(users)
})

mainRoutes.post('/user/create', async (req:Request, res:Response, next:NextFunction) => {
    const {name, password} = req.body
    const createdUser = await createUser(name, new Date(), password)
    res.json({hello:'world', createdUser})
})

mainRoutes.post(
    '/user/confidencial', 
    [verifyToken],
    async (req:Request, res:Response, next:NextFunction) => {
        return res.status(201).json({message:'Acesso autorizado'})
    }
)

export {mainRoutes}