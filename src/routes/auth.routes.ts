import { NextFunction, Request, Response, Router } from "express";

import {compare} from 'bcrypt'

import jwt, {Secret} from 'jsonwebtoken'

import { getUserByName } from "../services/user";

const authRoutes = Router()

authRoutes.post('/user/signin', async (req:Request, res:Response, next:NextFunction) => {
    const {name, password} = req.body
    const user = await getUserByName(name)
    if(!user){
        return res.status(404).json({
            message: 'User not found'
        })
    }
    const validPassword = await compare(password, user.password)
    if(!validPassword){
        return res.status(404).json({
            message:'Invalid password'
        })
    }
    const token = jwt.sign(
        user, 
        process.env.JWT_TOKEN_SECRET as Secret, 
        {expiresIn: '1h'}
    )
    return res.status(200).json({
        message:'Sucessfully authenticated',
        token
    })
    
})

export {authRoutes}