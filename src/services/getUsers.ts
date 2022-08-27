import { prismaClient } from "../database/prisma";

export async function getUsers(){
    const users = await prismaClient.user.findFirst()
    return users
}
export async function createUser(){
    await prismaClient.user.create({data: {
        birthDay: new Date(),
        currentGraduation: 'Azul',
        name:'Gabs',
    }})
}