import { NextFunction, Request, Response } from "express";
import { changeUsername, createUser } from "../services/user";

export async function handleCreateUser(req:Request, res:Response, next:NextFunction){
    const {name, password} = req.body
    const createdUser = await createUser(name, new Date(), password)
    res.json({hello:'world', createdUser})
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