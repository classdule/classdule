import { Academy } from "../entities/academy";

export interface OperationError {
    message: string;
    error: string;
}
export interface AcademyRepositoryBase {
    create: (academy: Academy) => Promise<Academy | OperationError | null>;
    delete: (academyId: string) => Promise<Academy | null>;
    findAcademyByName: (academyName: string) => Promise<Academy | null>;
    queryAcademiesByName: (subName: string) => Promise<Academy[]>;
    findAll: () => Promise<Academy[]>;
}