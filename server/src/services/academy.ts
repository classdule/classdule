import { prismaClient } from "../database/prisma";

export async function getAcademies(){
    const academies = await prismaClient.academy.findMany()
    return academies
}