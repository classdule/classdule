import { ClassroomRepository } from "../../repositories/classroom-repository";

interface Request {
  academyId: string;
}

export class GetClassroomsByAcademy {
  constructor(public classroomsRepository: ClassroomRepository) {}

  async do({ academyId }: Request) {
    const queryResult = await this.classroomsRepository.findByGroup(academyId);
    return queryResult;
  }
}
