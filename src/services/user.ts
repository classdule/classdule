import { prismaClient } from "../database/prisma";

import { hash } from "bcrypt"

async function isUsernameAlreadyUsed(name:string){
    const queryResults = await prismaClient.user.findFirst({
        where: {
            name: name
        }
    })
    return !!queryResults
}

export async function getUsers(){
    const users = await prismaClient.user.findMany()
    return users
}
export async function createUser(name: string, birthDay: Date, password:string){
    const encryptedPassword = await hash(password, 10)
    const usernameAlreadyUsed = await isUsernameAlreadyUsed(name)
    if(usernameAlreadyUsed){
        return
    }
    const createdUser = await prismaClient.user.create({data: {
        birthDay: birthDay,
        name:name,
        currentGraduation: { 
            create: {
                belt:'Branca'
            }
        },
        password: encryptedPassword
    }})
    return createdUser
}

export async function getUserByName(name:string){
    const user = await prismaClient.user.findFirst({
        where: {
            name: name
        }
    })
    return user
}