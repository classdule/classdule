import { Classroom } from "../entities/classroom";

export interface ClassroomRepository {
    create: (classroom: Classroom) => Promise<Classroom>;
    delete: (classroomId: string) => Promise<Classroom | null>;
}