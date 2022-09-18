import { Graduation } from "../entities/graduation";

export interface GraduationRepository {
    create: (graduation: Graduation) => Promise<Graduation>;
    delete: (graduationId: string) => Promise<Graduation | null>;
    findAll: () => Promise<Graduation[]>; 
    findByName: (name:string) => Promise<Graduation | null>
}