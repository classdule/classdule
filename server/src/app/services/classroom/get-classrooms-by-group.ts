import { Classroom } from "../../entities/classroom";
import { ClassroomRepository } from "../../repositories/classroom-repository";

interface Request {
  groupId: string;
}
interface Response {
  classrooms: Classroom[];
}

export class GetClassroomsByGroup {
  constructor(public classroomsRepository: ClassroomRepository) {}

  async do({ groupId }: Request): Promise<Response> {
    const queryResult = await this.classroomsRepository.findByGroup(groupId);
    return {
      classrooms: queryResult,
    };
  }
}
