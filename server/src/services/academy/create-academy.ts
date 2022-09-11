import { Academy } from "../../entities/academy";
import { AcademyRepositoryBase } from "../../repositories/academy-repository";

export class CreateAcademy {
    private repository: AcademyRepositoryBase;

    constructor(repository: AcademyRepositoryBase){
        this.repository = repository
    }
    async execute(academy: Academy){
        const createdAcademy = await this.repository.create(academy)
        return createdAcademy
    }
}