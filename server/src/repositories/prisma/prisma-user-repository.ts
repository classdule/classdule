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
            name: createdUser.name,
            password: createdUser.password
        }, createdUser.id)
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
            name: deletedUser.name,
            password: deletedUser.password
        }, deletedUser.id)
    }
    async findUserByName(username: string){
        const user = await prismaClient.user.findUnique({
            where: {
                name: username
            },
            include: {
                currentGraduation: {
                    select: {
                        name: true
                    }
                }
            },
        })
        if(!!user){
            return new User({
                birthDay: user.birthDay,
                currentGrade: user.currentGrade,
                currentGraduation: user.currentGraduation.name,
                name: user.name,
                password: user.password,
            }, user.id)
        }
        return null
    }
    async changeUserName (userId: string, username: string){
        const updatedUser = await prismaClient.user.update({
            data: {
                name: username
            },
            where: {
                id: userId
            },
            include: {
                currentGraduation: true
            }
        })
        return new User({
            birthDay: updatedUser.birthDay,
            currentGrade: updatedUser.currentGrade,
            currentGraduation: updatedUser.currentGraduation.name,
            name: updatedUser.name,
            password: updatedUser.password
        }, updatedUser.id)
    }

    async findAll(){
        const queryUsers = await prismaClient.user.findMany({
            include: {
                currentGraduation: true
            }
        })
        return queryUsers.map(user => {
            return new User({
                birthDay: user.birthDay,
                currentGrade: user.currentGrade,
                currentGraduation: user.currentGraduation.name,
                name: user.name,
                password: user.password
            }, user.id)
        })
    }

}