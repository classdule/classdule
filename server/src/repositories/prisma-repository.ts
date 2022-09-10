import { PrismaClient } from "@prisma/client"

export class PrismaRepository {
    private client: PrismaClient = new PrismaClient()
    get Client(){
        return this.client
    }
}