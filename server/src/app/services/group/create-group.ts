import { Group } from "../../entities/group";
import { GroupRepository } from "../../repositories/group-repository";

interface Request {
  responsibleEducatorId: string;
  name: string;
  location: string;
}
interface Response {
  group: Group;
}
export class CreateGroup {
  private repository: GroupRepository;

  constructor(repository: GroupRepository) {
    this.repository = repository;
  }
  async do(request: Request): Promise<Response> {
    const group = new Group({
      location: request.location,
      name: request.name,
      responsibleEducatorId: request.responsibleEducatorId,
    });

    await this.repository.create(group);
    return {
      group: group,
    };
  }
}
