import { Group } from "../../src/entities/group";
import { GroupRepository } from "../../src/repositories/group-repository";

export class InMemoryGroupRepository implements GroupRepository {
  groups: Group[] = [];
  async create(group: Group) {
    this.groups.push(group);
  }
  async delete(groupId: string) {
    this.groups = this.groups.filter((academy) => academy.id !== groupId);
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

  async findGroupById(groupId: string) {
    const foundGroup =
      this.groups.find((group) => group.id === groupId) || null;
    return foundGroup;
  }
}
