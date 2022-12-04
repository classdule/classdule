import { Group } from "../entities/group";

export interface OperationError {
    message: string;
    error: string;
}
export interface GroupRepository {
    create: (academy: Group) => Promise<Group | OperationError | null>;
    delete: (academyId: string) => Promise<Group | null>;
    findAcademyByName: (academyName: string) => Promise<Group | null>;
    queryAcademiesByName: (subName: string) => Promise<Group[]>;
    findAll: () => Promise<Group[]>;
    findEducatorsIds: (academyId: string) => Promise<string[]>;
}