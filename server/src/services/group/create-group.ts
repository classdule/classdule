import { Group } from "../../entities/group";
import { GroupRepository } from "../../repositories/group-repository";

interface Request {
    responsibleEducatorId: string;
    name: string;
    location: string;
}
export class CreateAcademy {
    private repository: GroupRepository;

    constructor(repository: GroupRepository){
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