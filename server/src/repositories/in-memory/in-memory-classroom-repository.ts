import { areIntervalsOverlapping, Day, parseISO } from "date-fns";
import { intersection } from "lodash";

import { Classroom } from "../../entities/classroom";
import { ClassroomRepository } from "../classroom-repository";

export class InMemoryClassroomRepository implements ClassroomRepository {
  classrooms: Classroom[] = [];

  async create(classroom: Classroom) {
    // Ensure that all classrooms has the same date, and only the time is different.
    classroom.startsAt.setFullYear(1970, 0, 1);
    classroom.endsAt.setFullYear(1970, 0, 1);
    classroom.startsAt.setDate(0);
    classroom.endsAt.setDate(0);

    this.classrooms.push(classroom);
    return classroom;
  }
  async delete(classroomId: string) {
    const targetClassroom = this.classrooms.find(
      (classroom) => classroom.id === classroomId
    );
    this.classrooms = this.classrooms.filter(
      (classroom) => classroom.id !== classroomId
    );
    return targetClassroom ?? null;
  }
  async findOverlappingDateClassroom(
    start: Date,
    end: Date,
    weekdays: Day[],
    academyId: string
  ) {
    const overlappingClassroom = this.classrooms.find((classroom) => {
      return (
        areIntervalsOverlapping(
          {
            end: end,
            start: start,
          },
          {
            end: classroom.endsAt,
            start: classroom.startsAt,
          }
        ) &&
        intersection(weekdays, classroom.weekdays).length > 0 &&
        academyId === classroom.groupId
      );
    });
    return overlappingClassroom ?? null;
  }
  async findById(classroomId: string) {
    const foundClassroom = this.classrooms.find(
      (classroom) => classroom.id === classroomId
    );
    return foundClassroom ?? null;
  }
  async findByAcademy(academyId: string) {
    return this.classrooms.filter(
      (classroom) => classroom.groupId === academyId
    );
  }
}
