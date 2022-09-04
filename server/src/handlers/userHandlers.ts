import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { password, username } from "../schemas";
import { changeUsername, createUser, deleteUser, getUsers } from "../services/user";

export async function handleGetUsers(req:Request, res:Response, next:NextFunction){
    const queryResult = await getUsers()
    return res.status(200).json(queryResult)
}

export const createUserSchema = z.object({
    body: z.object({
        name: username,
        password: password,
        graduation: z.string({
            required_error: 'Belt name is required',
        }).max(255, 'There is not belt with such an big name'),
        birthday: z.string({
            required_error: 'Birthday is required'
        })
    })
})
type handleCreateUserRequestBody = z.TypeOf<typeof createUserSchema>['body']
export async function handleCreateUser(req:Request<{}, {}, handleCreateUserRequestBody>, res:Response, next:NextFunction){
    const {name, password, graduation, birthday} = req.body
    const parsedBirthday = new Date(birthday)
    const operationResult = await createUser(name, parsedBirthday, password, graduation)
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