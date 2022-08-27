import { prismaClient } from "../database/prisma";

export async function getUsers(){
    const users = await prismaClient.user.findMany()
    return users
}