import { AcademyRepositoryBase } from "../../repositories/academy-repository";

interface Request {
    responsibleEducatorId: string;
    name: string;
    location: string;
}
export class CreateAcademy {
    private repository: AcademyRepositoryBase;

    constructor(repository: AcademyRepositoryBase){
        this.repository = repository
    }
    async execute(request: Request){
        const createdAcademy = await this.repository.create({
            location: request.location,
            name: request.name,
            responsibleEducatorId: request.responsibleEducatorId
        })
        return createdAcademy
    }
}