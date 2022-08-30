import { prismaClient } from "../database/prisma";

export async function getGraduations(){
    const belts = await prismaClient.graduation.findMany()
    return belts
}

export async function getGraduationBy(where: any){
    const graduation = await prismaClient.graduation.findUnique({
        where: where
    })
    return graduation
}

export async function createGraduation(name:string, value: number){
    const isGraduationNameAlreadyInUse = await getGraduationBy({name})
    const isGraduationValueAlreadyInUse = await getGraduationBy({value})
    if(!!isGraduationNameAlreadyInUse){
        return {
            message: 'Graduation name already in use',
            createdGraduation: null
        }
    }
    if(!!isGraduationValueAlreadyInUse){
        return {
            message: 'Graduation value already in use',
            createdGraduation: null
        }
    }
    const createdGraduation = await prismaClient.graduation.create({
        data: {
            name,
            value,
        }
    })
    return {
        message: 'Graduation created successfully',
        createdGraduation
    }
}

export async function deleteGraduation(id:string){
    const deletedGraduation = await prismaClient.graduation.delete({
        where: {
            id: id
        }
    })
    return deletedGraduation
}