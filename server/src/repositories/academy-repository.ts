import { Academy } from "../entities/academy";

export interface CreateAcademyArgs {
    name: Academy['name'];
    location: Academy['location'];
    responsibleEducatorId: Academy['responsibleEducator']['id']
}
export interface OperationError {
    message: string;
    error: string;
}
export interface AcademyRepositoryBase {
    create: (academy: CreateAcademyArgs) => Promise<Academy | OperationError | null>;
    delete: (academyId: string) => Promise<Academy | null>;
    findAcademyByName: (academyName: string) => Promise<Academy | null>;
    queryAcademiesByName: (subName: string) => Promise<Academy[]>;
}