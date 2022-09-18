import {Day} from 'date-fns' 

import { Classroom } from "../entities/classroom";

export interface ClassroomRepository {
    create: (classroom: Classroom) => Promise<Classroom>;
    delete: (classroomId: string) => Promise<Classroom | null>;
    findOverlappingDateClassroom: (start: Date, end: Date, weekdays: Day[], academyId: string) => Promise<Classroom | null>;
    findById: (classroomId: string) => Promise<Classroom | null>
}