import { Academy } from "../../entities/academy";
import { AcademyRepositoryBase, CreateAcademyArgs } from "../academy-repository";

import { prismaClient } from "../../database/prisma";
import { User } from "../../entities/user";

export class PrismaAcademyRepository implements AcademyRepositoryBase {
    async create (academy: CreateAcademyArgs) {
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
            educators: [],
            id: createdAcademy.id,
            location: createdAcademy.location,
            name: createdAcademy.name,
            responsibleEducator: new User({
                birthDay: createdAcademy.responsibleEducator.birthDay,
                currentGrade: createdAcademy.responsibleEducator.currentGrade,
                currentGraduation: createdAcademy.responsibleEducator.currentGraduation.name,
                id: createdAcademy.responsibleEducator.id,
                name: createdAcademy.responsibleEducator.name,
                password: createdAcademy.responsibleEducator.password,
            })
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
                responsibleEducator: {
                    include: {
                        currentGraduation: true
                    }
                }
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
            responsibleEducator: new User({
                birthDay: deletedAcademy.responsibleEducator.birthDay,
                currentGrade: deletedAcademy.responsibleEducator.currentGrade,
                currentGraduation: deletedAcademy.responsibleEducator.currentGraduation.name,
                id: deletedAcademy.responsibleEducator.id,
                name: deletedAcademy.responsibleEducator.name,
                password: deletedAcademy.responsibleEducator.password
            })
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
            responsibleEducator: new User({
                birthDay: queryResult.responsibleEducator.birthDay,
                currentGrade: queryResult.responsibleEducator.currentGrade,
                currentGraduation: queryResult.responsibleEducator.currentGraduation.name,
                id: queryResult.responsibleEducator.id,
                name: queryResult.responsibleEducator.name,
                password: queryResult.responsibleEducator.password
            })
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
                responsibleEducator: {
                    include: {
                        currentGraduation: true
                    }
                }
            }
        }) || null
        return academiesFound.map(academy => new Academy({
            educators: academy.educators.map(educator => new User({
                birthDay: educator.birthDay,
                currentGrade: educator.currentGrade,
                currentGraduation: educator.currentGraduation.name,
                id: educator.id,
                name: educator.name,
                password: educator.password
            })),
            id: academy.id,
            location: academy.location,
            name: academy.name,
            responsibleEducator: new User({
                birthDay: academy.responsibleEducator.birthDay,
                currentGrade: academy.responsibleEducator.currentGrade,
                currentGraduation: academy.responsibleEducator.currentGraduation.name,
                id: academy.responsibleEducator.id,
                name: academy.responsibleEducator.name,
                password: academy.responsibleEducator.password
            })
        }))
    }

}