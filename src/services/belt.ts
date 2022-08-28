import { prismaClient } from "../database/prisma";

export async function getBelts(){
    const belts = await prismaClient.belt.findMany()
    return belts
}