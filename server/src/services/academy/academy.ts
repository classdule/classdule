import { Prisma } from "@prisma/client";
import { PrismaRepository } from "../../repositories/prisma-repository";

interface Props {
    repository: PrismaRepository
}

export class AcademyServiceBase {
    props: Props
    constructor(props:Props){
        this.props = props
    }
}

export class CreateAcademy extends AcademyServiceBase {
    constructor(props:Props){
        super({
            repository: props.repository
        })
    }

    public async createAcademy(args: Prisma.AcademyCreateArgs){
        await this.props.repository.Client.academy.create(args)
    }
}