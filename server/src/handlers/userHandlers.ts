import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { changeUsername, createUser, deleteUser, getUsers } from "../services/user";

export async function handleGetUsers(req:Request, res:Response, next:NextFunction){
    const queryResult = await getUsers()
    return res.status(200).json(queryResult)
}

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Username is required'
        })
            .min(4, 'Username must be at least 4 characters')
            .max(255, 'Username must be smaller than 256 characters'),
        password: z.string({
            required_error: 'Password is required'
        })
            .min(8, 'Password must be at least 8 characters')
            .max(255, 'Password must be smaller than 256 characters'),
        belt: z.string({
            required_error: 'Belt name is required',
        }).max(255, 'There is not belt with such an big name')
    })
})
type handleCreateUserRequestBody = z.TypeOf<typeof createUserSchema>['body']
export async function handleCreateUser(req:Request<{}, {}, handleCreateUserRequestBody>, res:Response, next:NextFunction){
    const {name, password, belt} = req.body
    const operationResult = await createUser(name, new Date(), password, belt)
    res.json(operationResult)
}

export async function handleChangeUsername(req:Request, res:Response){
    const {name, user} = req.body
    if(!name || !user){
        return res.status(404).json({
            message: 'Operation failed'
        })
    }
    if(name === user.name){
        return res.status(201).json(user)
    }
    const newUser = await changeUsername(user.id, name)
    return res.status(201).json(newUser)
}

export async function handleDeleteUser(req:Request, res:Response){
    const {user} = req.body
    const deletedUser = await deleteUser(user.id)
    return res.json({deletedUser})
}