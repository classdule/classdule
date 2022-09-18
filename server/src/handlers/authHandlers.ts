import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

import { z } from 'zod'
import { UserRepositoryPrisma } from "../repositories/prisma/prisma-user-repository";
import { password, username } from "../schemas";
import { Signin } from "../services/auth/sign-in";

export const signinSchema = z.object({
    body: z.object({
        name: username,
        password: password
    })
})

type handleSigninRequest = z.TypeOf<typeof signinSchema>
export async function handleSignin(req:Request<{}, {}, handleSigninRequest['body']>, res:Response){
    const {name, password} = req.body
    const signin = new Signin(new UserRepositoryPrisma())
    try {
        const { token } = await signin.execute(name, password)
        
        res.cookie('access_token', token)
    } catch(err){
        console.log(err)
        return res.status(404).json({error: err})
    }
    return res.status(200).json({
        message:'Sucessfully authenticated'
    })
}