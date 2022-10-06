import { isThisQuarter } from "date-fns";
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
                password:user.password,
                email: user.email,
                graduationDate: user.graduationDate,
                academy: {
                    connect: {
                        id: user.academyId
                    }
                },
            },
            include: {
                currentGraduation: true
            }
        })
        return new User({
            birthDay: createdUser.birthDay,
            currentGrade: createdUser.currentGrade,
            currentGraduation: createdUser.graduationId,
            name: createdUser.name,
            password: createdUser.password,
            email: createdUser.email,
            graduationDate: createdUser.graduationDate,
            academyId: createdUser.academyId
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
            password: deletedUser.password,
            email: deletedUser.email,
            graduationDate: deletedUser.graduationDate,
            academyId: deletedUser.academyId
        }, deletedUser.id)
    }
    async findByEmail(email: string){
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            },
            include: {
                currentGraduation: {
                    select: {
                        name: true
                    }
                }
            },
        });
        if(!!user){
            return new User({
                birthDay: user.birthDay,
                currentGrade: user.currentGrade,
                currentGraduation: user.currentGraduation.name,
                name: user.name,
                password: user.password,
                email: user.email,
                graduationDate: user.graduationDate,
                academyId: user.academyId
            }, user.id);
        }
        return null;
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
                currentGraduation: true,
                academy: true
            }
        })
        return new User({
            birthDay: updatedUser.birthDay,
            currentGrade: updatedUser.currentGrade,
            currentGraduation: updatedUser.currentGraduation.name,
            name: updatedUser.name,
            password: updatedUser.password,
            email: updatedUser.email,
            graduationDate: updatedUser.graduationDate,
            academyId: updatedUser.academyId
        }, updatedUser.id)
    }

    async findAll(){
        const queryUsers = await prismaClient.user.findMany({
            include: {
                currentGraduation: true,
                academy: true
            }
        })
        return queryUsers.map(user => {
            return new User({
                birthDay: user.birthDay,
                currentGrade: user.currentGrade,
                currentGraduation: user.currentGraduation.name,
                name: user.name,
                password: user.password,
                email: user.email,
                graduationDate: user.graduationDate,
                academyId: user.academyId
            }, user.id)
        })
    }

    async findById(userId:string){
        const foundUser = (await prismaClient.user.findUnique({
            where: {
                id: userId
            },
            include: {
                currentGraduation: true
            }
        })) ?? null;
        if(!foundUser){
            return null;
        }
        return new User({
            birthDay: foundUser.birthDay,
            currentGrade: foundUser.currentGrade,
            currentGraduation: foundUser.currentGraduation.name,
            name: foundUser.name,
            password: foundUser.password,
            email: foundUser.email,
            graduationDate: foundUser.graduationDate,
            academyId: foundUser.academyId
        }, foundUser.id);
    }

    async queryByName(name: string){
        const foundUsers = await prismaClient.user.findMany({
            where: {
                name: {
                    contains: name
                }
            },
            include: {
                currentGraduation: true
            }
        })
        return foundUsers.map(u => {
            return new User({
                academyId: u.academyId,
                birthDay: u.birthDay,
                currentGrade: u.currentGrade,
                currentGraduation: u.currentGraduation.name,
                email: u.email,
                graduationDate: u.graduationDate,
                name: u.name,
                password: u.password
            }, u.id);
        });
    }

}