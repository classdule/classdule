import { Classroom } from "../../../../app/entities/classroom";

export class ClassroomHttpMapper {
  static toHttp(classroom: Classroom) {
    return {
      id: classroom.id,
      educatorId: classroom.educatorId,
      weekdays: classroom.weekdays,
      type: classroom.type,
      content: classroom.content,
      startsAt: classroom.startsAt,
      endsAt: classroom.endsAt,
    };
  }
}
