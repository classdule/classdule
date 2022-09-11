import { Academy } from "../../entities/academy";
import { AcademyRepositoryBase } from "../academy-repository";

import { prismaClient } from "../../database/prisma";
import { User } from "../../entities/user";

export class PrismaAcademyRepository implements AcademyRepositoryBase {
    async create (academy: Academy) {
        const createdAcademy = await prismaClient.academy.create({
            data: {
                location: academy.location,
                name: academy.name,
                responsibleEducator: {
                    connect: {
                        name: academy.responsibleEducator
                    }
                },
            },
            include: {
                responsibleEducator: true
            }
            
        })
        return new Academy({
            educators: [],
            id: createdAcademy.id,
            location: createdAcademy.location,
            name: createdAcademy.name,
            responsibleEducator: createdAcademy.responsibleEducator.name
        })
    }
    async delete (academyId: string) {
        const deletedAcademy = await prismaClient.academy.delete({
            where: {
                id: academyId
            },
            include: {
                educators: {
                    include: {
                        currentGraduation: true
                    }
                },
                responsibleEducator: true
            }
        })
        return new Academy({
            educators: deletedAcademy.educators.map(educator => new User({
                birthDay: educator.birthDay,
                currentGrade: educator.currentGrade,
                currentGraduation: educator.currentGraduation.name,
                id: educator.id,
                name: educator.name,
                password: educator.password
            })),
            id: deletedAcademy.id,
            location: deletedAcademy.location,
            name: deletedAcademy.name,
            responsibleEducator: deletedAcademy.responsibleEducator.name
        })
    }
    async findAcademyByName (academyName: string) {
        const queryResult = await prismaClient.academy.findUnique({
            where: {
                name: academyName
            },
            include: {
                educators: {
                    include: {
                        currentGraduation: true
                    }
                },
                responsibleEducator: true
            }
        }) || null
        if(!queryResult){
            return queryResult
        }
        return new Academy({
            educators: queryResult.educators.map(educator => new User({
                birthDay: educator.birthDay,
                currentGrade: educator.currentGrade,
                currentGraduation: educator.currentGraduation.name,
                id: educator.id,
                name: educator.name,
                password: educator.password
            })),
            id: queryResult.id,
            location: queryResult.location,
            name: queryResult.name,
            responsibleEducator: queryResult.responsibleEducator.name
        })
    }
    async queryAcademiesByName (subName: string) {
        const academiesFound = await prismaClient.academy.findMany({
            where: {
                name: subName
            },
            include: {
                educators: {
                    include: {
                        currentGraduation: true
                    }
                },
                responsibleEducator: true
            }
        }) || null
        return academiesFound.map(academie => new Academy({
            educators: academie.educators.map(educator => new User({
                birthDay: educator.birthDay,
                currentGrade: educator.currentGrade,
                currentGraduation: educator.currentGraduation.name,
                id: educator.id,
                name: educator.name,
                password: educator.password
            })),
            id: academie.id,
            location: academie.location,
            name: academie.name,
            responsibleEducator: academie.responsibleEducator.name
        }))
    }

}