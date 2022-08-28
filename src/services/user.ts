import { prismaClient } from "../database/prisma";

import {genSalt, hash} from "bcrypt"

export async function getUsers(){
    const users = await prismaClient.user.findMany()
    return users
}
export async function createUser(name: string, birthDay: Date, graduationId: number, password:string){
    const encryptedPassword = await hash(password, 10)
    await prismaClient.user.create({data: {
        birthDay: birthDay,
        name:name,
        currentGraduation: {connect: {
            id: graduationId
        }},
        password: encryptedPassword
    }})
}

export async function getUserByName(name:string){
    const user = await prismaClient.user.findFirst({
        where: {
            name: name
        }
    })
    return user
}