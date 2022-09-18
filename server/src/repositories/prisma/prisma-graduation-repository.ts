import { prismaClient } from "../../database/prisma";
import { Graduation } from "../../entities/graduation";
import { GraduationRepository } from "../graduation-repository";

export class PrismaGraduationRepository implements GraduationRepository {
    async create(graduation: Graduation){
        const createdGraduation = await prismaClient.graduation.create({
            data: {
                name: graduation.name,
                value: graduation.value
            }
        });
        return new Graduation({
            name: createdGraduation.name,
            value: createdGraduation.value
        }, createdGraduation.id)
    }

    async delete (graduationId: string) {
        const deletedGraduation = await prismaClient.graduation.delete({
            where: {
                id: graduationId
            }
        })
        return new Graduation({
            name: deletedGraduation.name,
            value: deletedGraduation.value
        }, deletedGraduation.id)
    }

    async findAll() {
        const queryResult = await prismaClient.graduation.findMany()
        return queryResult.map(graduation => new Graduation({
            name: graduation.name,
            value: graduation.value
        }, graduation.id))
    }

    async findByName(name: string) {
        const foundGraduation = await prismaClient.graduation.findUnique({
            where: {
                name: name
            }
        })
        if(!foundGraduation){
            return null
        }
        return new Graduation({
            name: foundGraduation.name,
            value: foundGraduation.value
        }, foundGraduation.id)
    }
    
}