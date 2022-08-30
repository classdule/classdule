import { prismaClient } from "../database/prisma";

export async function getGraduations(){
    const belts = await prismaClient.graduation.findMany()
    return belts
}

export async function createGraduation(name:string, value: number){
    const createdGraduation = await prismaClient.graduation.create({
        data: {
            name,
            value,
        }
    })
    return createdGraduation
}

export async function deleteGraduation(id:string){
    const deletedGraduation = await prismaClient.graduation.delete({
        where: {
            id: id
        }
    })
    return deletedGraduation
}