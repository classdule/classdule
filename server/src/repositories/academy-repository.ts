import { Academy } from "../entities/academy";

export interface AcademyRepositoryBase {
    create: (academy: Academy) => Promise<Academy | null>;
    delete: (academyId: string) => Promise<Academy | null>;
    findAcademyByName: (academyName: string) => Promise<Academy | null>;
    queryAcademiesByName: (subName: string) => Promise<Academy[]>;
}