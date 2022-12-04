import { Group } from "../../entities/academy";
import { AcademyRepository } from "../../repositories/academy-repository";

interface Request {
    responsibleEducatorId: string;
    name: string;
    location: string;
}
export class CreateAcademy {
    private repository: AcademyRepository;

    constructor(repository: AcademyRepository){
        this.repository = repository
    }
    async execute(request: Request){
        const createdAcademy = await this.repository.create(new Group({
            location: request.location,
            name: request.name,
            responsibleEducatorId: request.responsibleEducatorId,
            educatorsIds: []
        }))
        return createdAcademy
    }
}