import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { User } from "../entities/user";
import { UserRepositoryPrisma } from "../repositories/prisma/prisma-user-repository";
import { password, username } from "../schemas";
import { Signin } from "../services/auth/sign-in";
import { ChangeUserName } from "../services/user/change-username";
import { CreateUser } from "../services/user/create-user";
import { DeleteUser } from "../services/user/delete-user";
import { GetAllUsers } from "../services/user/get-all-users";

export async function handleGetUsers(req:Request, res:Response, next:NextFunction){
    const usersRepository = new UserRepositoryPrisma()
    const findUsers = new GetAllUsers(usersRepository)
    const queryResult = await findUsers.do()
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
            id: z.string()
        })
    })
})
type ChangeUsernameRequest = z.TypeOf<typeof changeUsernameSchema>
export async function handleChangeUsername(req:Request<{}, {}, ChangeUsernameRequest['body']>, res:Response){
    const {name, user} = req.body;
    const userRepository = new UserRepositoryPrisma()
    const changeUsername = new ChangeUserName(userRepository)
    const signin = new Signin(userRepository)

    const newUser = await changeUsername.execute(user.id, name)
    if(!newUser){
        return res.status(404).json({
            message:'User not found'
        })
    }
    
    return res.status(201).json(newUser)
}
export const deleteUserSchema = z.object({
    body: z.object({
        user: z.object({
            id: z.string()
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