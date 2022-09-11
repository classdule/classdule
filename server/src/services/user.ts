import { prismaClient } from "../database/prisma";

export async function getUsers(){
    const users = await prismaClient.user.findMany({
        include: {
            Checkin: {
                where: {
                    verified: true
                }
            }
        },

    })
    return users.map(user => {
        return {
            ...user,
            classrooms: user.Checkin.filter(checkin => checkin.verified).length
        }
    })
}