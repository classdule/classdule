import { Day } from "date-fns";

import { Classroom } from "../entities/classroom";

export interface ClassroomRepository {
  create: (classroom: Classroom) => Promise<void>;
  delete: (classroomId: string) => Promise<void>;
  findOverlappingDateClassroom: (
    start: Date,
    end: Date,
    weekdays: Day[],
    academyId: string
  ) => Promise<Classroom | null>;
  findById: (classroomId: string) => Promise<Classroom | null>;
  findByGroup: (academyId: string) => Promise<Classroom[]>;
}
