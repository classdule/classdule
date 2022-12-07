import { GroupRepository } from "../../repositories/group-repository";

export class GetAllGroups {
  constructor(public groupsRepository: GroupRepository) {}

  async do() {
    const queryResult = this.groupsRepository.findAll();
    return queryResult;
  }
}
