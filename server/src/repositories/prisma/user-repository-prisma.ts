import { prismaClient } from "../../database/prisma"; 

import { User } from "../../entities/user";
import { UserRepositoryBase } from "../user-repository";

export class UserRepositoryPrisma implements UserRepositoryBase {
    async create(user:User){
        const createdUser = await prismaClient.user.create({
            data: {
                name: user.name,
                birthDay: user.birthDay,
                currentGraduation: {
                    connect: {
                        name: user.currentGraduation
                    }
                },
                password:user.password
            },
            include: {
                currentGraduation: true
            }
        })
        return new User({
            birthDay: createdUser.birthDay,
            currentGrade: createdUser.currentGrade,
            currentGraduation: createdUser.currentGraduation.name,
            id: createdUser.id,
            name: createdUser.name,
            password: createdUser.password
        })
    }
    async delete(userId: string){
        const deletedUser = await prismaClient.user.delete({
            where: {
                id: userId
            },
            include: {
                currentGraduation: true
            }
        })
        return new User({
            birthDay: deletedUser.birthDay,
            currentGraduation: deletedUser.currentGraduation.name,
            currentGrade: deletedUser.currentGrade,
            id: deletedUser.id,
            name: deletedUser.name,
            password: deletedUser.password
        })
    }
    async findUsersByName(username: string){
        const users = await prismaClient.user.findMany({
            where: {
                name: username
            },
            include: {
                currentGraduation: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return users.map(user => new User({
            birthDay: user.birthDay,
            currentGrade: user.currentGrade,
            currentGraduation: user.currentGraduation.name,
            name: user.name,
            password: user.password,
            id: user.id
        }))
    }

}