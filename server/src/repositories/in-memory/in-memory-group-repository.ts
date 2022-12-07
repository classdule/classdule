import { v4 as uuid } from "uuid";

import { Group } from "../../entities/group";
import { GroupRepository } from "../group-repository";

export class InMemoryGroupRepository implements GroupRepository {
  groups: Group[] = [];
  async create(academy: Group) {
    const createGroup = new Group({
      educatorsIds: [],
      location: academy.location,
      name: academy.name,
      responsibleEducatorId: uuid(),
    });
    this.groups.push(createGroup);

    return createGroup;
  }
  async delete(groupId: string) {
    const deleteAcademy =
      this.groups.find((academy) => academy.id === groupId) || null;
    this.groups = this.groups.filter(
      (academy) => academy.id !== deleteAcademy?.id
    );
    return deleteAcademy;
  }
  async findGroupByName(groupName: string) {
    const foundAcademy =
      this.groups.find((group) => group.name === groupName) || null;
    return foundAcademy;
  }
  async queryGroupsByName(subName: string) {
    const matchingAcademies = this.groups.filter((group) =>
      group.name.includes(subName)
    );
    return matchingAcademies;
  }

  async findAll() {
    return this.groups;
  }
  async findEducatorsIds(groupId: string) {
    const targetAcademy = this.groups.find((group) => groupId === group.id);
    if (!targetAcademy) {
      return [];
    }
    return targetAcademy.educatorsIds;
  }

  async findGroupById(groupId: string) {
    const foundGroup =
      this.groups.find((group) => group.id === groupId) || null;
    return foundGroup;
  }
}
