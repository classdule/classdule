import { Group } from "../entities/group";

export interface OperationError {
  message: string;
  error: string;
}
export interface GroupRepository {
  create: (group: Group) => Promise<void>;
  delete: (groupId: string) => Promise<void>;
  findGroupByName: (groupName: string) => Promise<Group | null>;
  queryGroupsByName: (subName: string) => Promise<Group[]>;
  findAll: () => Promise<Group[]>;
  findGroupById: (groupId: string) => Promise<Group | null>;
}
