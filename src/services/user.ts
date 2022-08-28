import { prismaClient } from "../database/prisma";

import { hash } from "bcrypt"

export async function getUsers(){
    const users = await prismaClient.user.findMany()
    return users
}
export async function createUser(name: string, birthDay: Date, password:string){
    const encryptedPassword = await hash(password, 10)
    const usernameAlreadyUsed = await getUserByName(name)
    if(!!usernameAlreadyUsed){
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

export async function changeUsername(id: string, name: string){
    const user = await prismaClient.user.update({
        data: {
            name: name
        },
        where: {
            id: id
        }
    })
    return user
}

export async function deleteUser(id:string){
    const deletedUser = await prismaClient.user.delete({
        where: {
            id:id
        }
    })
    return deletedUser
}