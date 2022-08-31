import { prismaClient } from "../database/prisma";

export async function getAcademies(){
    const academies = await prismaClient.academy.findMany()
    return academies
}

export async function getAcademyBy(where:any){
    const queryResult = await prismaClient.academy.findUnique({
        where:where
    })
    return queryResult
}

export async function createAcademy(name:string, responsibleEducatorId:string, location:string){
    const existingAcademy = await getAcademyBy({name: name})
    if(!!existingAcademy){
        return {
            message: 'Academy name already in use',
            createdAcademy: null
        }
    }
    const createdAcademy = await prismaClient.academy.create({
        data: {
            name: name,
            responsibleEducator: {
                connect: {
                    id: responsibleEducatorId
                }
            },
            location: location
        }
    })
    return {
        message: 'Academy created successfully',
        createdAcademy
    }
}