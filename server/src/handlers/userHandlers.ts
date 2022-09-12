import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { User } from "../entities/user";
import { UserRepositoryPrisma } from "../repositories/prisma/user-repository-prisma";
import { password, username } from "../schemas";
import { getUsers } from "../services/user";
import { ChangeUserName } from "../services/user/change-username";
import { CreateUser } from "../services/user/create-user";
import { DeleteUser } from "../services/user/delete-user";

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
    const createUser = new CreateUser(new UserRepositoryPrisma())

    try {
        const operationResult = await createUser.execute(new User({
            birthDay: parsedBirthday,
            currentGrade: 0,
            currentGraduation: graduation,
            name: name,
            password: password,
        }))
        return res.json(operationResult)
    } catch(err) {
        return res.json({error: err})
    }
}
export const changeUsernameSchema = z.object({
    body: z.object({
        name: z.string(),
        user: z.object({
            name: z.string(),
            id: z.string()
        })
    })
})
type ChangeUsernameRequest = z.TypeOf<typeof changeUsernameSchema>
export async function handleChangeUsername(req:Request<{}, {}, ChangeUsernameRequest['body']>, res:Response){
    const {name, user} = req.body;
    const changeUsername = new ChangeUserName(new UserRepositoryPrisma())

    if(name === user.name){
        return res.status(201).json(user)
    }
    const newUser = await changeUsername.execute(user.id, name)
    return res.status(201).json(newUser)
}
export const deleteUserSchema = z.object({
    body: z.object({
        user: z.object({
            id: z.string(),
            name: z.string()
        })
    })
})
type DeleteUserRequest = z.TypeOf<typeof deleteUserSchema>
export async function handleDeleteUser(req:Request<{}, {}, DeleteUserRequest['body']>, res:Response){
    const {user} = req.body
    const deleteUser = new DeleteUser(new UserRepositoryPrisma())
    const deletedUser = await deleteUser.execute(user.id)
    return res.json(deletedUser)
}