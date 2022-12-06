import { ClassroomRepository } from "../../repositories/classroom-repository";

interface Request {
  groupId: string;
}

export class GetClassroomsByGroup {
  constructor(public classroomsRepository: ClassroomRepository) {}

  async do({ groupId }: Request) {
    const queryResult = await this.classroomsRepository.findByGroup(groupId);
    return queryResult;
  }
}
