import { prismaClient } from "../database/prisma";

export async function getClassroomsByAcademy(name:string){
    const queryResult = await prismaClient.classroom.findMany({
        where: {
            academy: {
                name: name
            }
        }
    })
    return queryResult
}

export async function createClassroom(type:string, academyName:string, educatorId:string){
    const createdClassroom = await prismaClient.classroom.create({
        data: {
            type: type,
            academy: {
                connect: {
                    name: academyName
                }
            },
            educator: {
                connect: {
                    id: educatorId
                }
            },
        }
    })
    return createdClassroom
}