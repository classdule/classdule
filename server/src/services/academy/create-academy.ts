import { Academy } from "../../entities/academy";
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
        const createdAcademy = await this.repository.create(new Academy({
            location: request.location,
            name: request.name,
            responsibleEducatorId: request.responsibleEducatorId,
            educatorsIds: []
        }))
        return createdAcademy
    }
}