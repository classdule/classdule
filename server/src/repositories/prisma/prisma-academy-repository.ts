import { Academy } from "../../entities/academy";
import { AcademyRepositoryBase } from "../academy-repository";

import { prismaClient } from "../../database/prisma";

export class PrismaAcademyRepository implements AcademyRepositoryBase {
    async create (academy: Academy) {
        try {
            const createdAcademy = await prismaClient.academy.create({
                data: {
                    location: academy.location,
                    name: academy.name,
                    responsibleEducator: {
                        connect: {
                            id: academy.responsibleEducatorId
                        }
                    },
                },
                include: {
                    responsibleEducator: {
                        include: {
                            currentGraduation: true
                        }
                    }
                }
                
            })
            return new Academy({
                educatorsIds: [],
                location: createdAcademy.location,
                name: createdAcademy.name,
                responsibleEducatorId: createdAcademy.responsibleEducatorId
            }, createdAcademy.id)
        } catch(err:unknown){
            if(err instanceof Error){
                return {
                    message: 'Could not create a new user',
                    error: err.name
                }
            }  
            return null     
            
        }
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
                responsibleEducator: {
                    include: {
                        currentGraduation: true
                    }
                }
            }
        })
        return new Academy({
            educatorsIds: deletedAcademy.educators.map(educator =>educator.id ),
            location: deletedAcademy.location,
            name: deletedAcademy.name,
            responsibleEducatorId: deletedAcademy.responsibleEducatorId
        }, deletedAcademy.id)
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
                responsibleEducator: {
                    include: {
                        currentGraduation: true
                    }
                }
            }
        }) || null
        if(!queryResult){
            return queryResult
        }
        return new Academy({
            educatorsIds: queryResult.educators.map(educator => educator.id),
            location: queryResult.location,
            name: queryResult.name,
            responsibleEducatorId: queryResult.responsibleEducatorId
        }, queryResult.id)
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
                responsibleEducator: {
                    include: {
                        currentGraduation: true
                    }
                }
            }
        }) || null
        return academiesFound.map(academy => new Academy({
            educatorsIds: academy.educators.map(educator => educator.id),
            location: academy.location,
            name: academy.name,
            responsibleEducatorId: academy.responsibleEducatorId
        }, academy.id))
    }

    async findAll () {
        const queryResult = await prismaClient.academy.findMany({
            include: {
                educators: true,
                responsibleEducator: true
            }
        })
        return queryResult.map(academy => new Academy({
            educatorsIds: academy.educators.map(educator => educator.id),
            location: academy.location,
            name: academy.name,
            responsibleEducatorId: academy.responsibleEducator.id
        }, academy.id))
    }
    async findEducatorsIds(academyId: string){
        const queryResult = await prismaClient.academy.findUnique({
            where: {
                id: academyId
            },
            include: {
                educators: true
            }
        });
        return queryResult
            ? queryResult.educators.map(educator => educator.id)
            : []
    }

}