import { NextFunction, Request, Response, Router } from "express";

import {compare} from 'bcrypt'
import { getUserByName } from "../services/user";

const authRoutes = Router()

authRoutes.post('/user/signin', async (req:Request, res:Response, next:NextFunction) => {
    const {name, password} = req.body
    const user = await getUserByName(name)
    const validPassword = await compare(password, user?.password as string)
    return res.json({...user, validPassword:validPassword})
})

export {authRoutes}