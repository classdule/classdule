import { prismaClient } from "../database/prisma";

export async function getUsers(){
    const users = await prismaClient.user.findMany()
    return users
}
export async function createUser(name: string, birthDay: Date, graduationId: number){
    const mockPassword = 'aaaaaaaa'
    await prismaClient.user.create({data: {
        birthDay: birthDay,
        name:name,
        currentGraduation: {connect: {
            id: graduationId
        }},
        password: mockPassword
    }})
}

export async function createGraduation(belt:string){
    await prismaClient.belt.create({
        data: {
            belt: belt
        }
    })
}