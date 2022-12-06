import { Group } from "../entities/group";

export interface OperationError {
  message: string;
  error: string;
}
export interface GroupRepository {
  create: (academy: Group) => Promise<Group | OperationError | null>;
  delete: (academyId: string) => Promise<Group | null>;
  findGroupByName: (academyName: string) => Promise<Group | null>;
  queryGroupsByName: (subName: string) => Promise<Group[]>;
  findAll: () => Promise<Group[]>;
  findEducatorsIds: (academyId: string) => Promise<string[]>;
}
