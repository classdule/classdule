import { Group } from "../../entities/group";
import { GroupRepository } from "../../repositories/group-repository";

interface Request {
  responsibleEducatorId: string;
  name: string;
  location: string;
}
export class CreateGroup {
  private repository: GroupRepository;

  constructor(repository: GroupRepository) {
    this.repository = repository;
  }
  async execute(request: Request) {
    const createdGroup = await this.repository.create(
      new Group({
        location: request.location,
        name: request.name,
        responsibleEducatorId: request.responsibleEducatorId,
        educatorsIds: [],
      })
    );
    return createdGroup;
  }
}
