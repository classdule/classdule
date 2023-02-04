import { Group } from "../../../../app/entities/group";

export class GroupHttpMapper {
  static toHttp(group: Group) {
    return {
      id: group.id,
      name: group.name,
      location: group.location,
      responsibleEducatorId: group.responsibleEducatorId,
    };
  }
}
