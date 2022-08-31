import { compare } from "bcrypt";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { getUserByName } from "../services/user";

import { z } from 'zod'
import { password, username } from "../schemas";

export const signinSchema = z.object({
    body: z.object({
        name: username,
        password: password
    })
})

type handleSigninRequestBody = z.TypeOf<typeof signinSchema>['body']

export async function handleSignin(req:Request<{}, {}, handleSigninRequestBody>, res:Response){
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
}