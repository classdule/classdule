import { prismaClient } from "../../database/prisma"; 

import {hash} from 'bcrypt'

import { User } from "../../entities/user";
import { UserRepositoryBase } from "../user-repository";

export class UserRepositoryPrisma implements UserRepositoryBase {
    async create(user:User){
        const encryptedPassword = await hash(user.password, 10)
        await prismaClient.user.create({
            data: {
                name: user.name,
                birthDay: user.birthDay,
                currentGraduation: {
                    connect: {
                        name: user.currentGraduation
                    }
                },
                password:encryptedPassword
            }
        })
    }
    async delete(userId: string){
        await prismaClient.user.delete({
            where: {
                id: userId
            }
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