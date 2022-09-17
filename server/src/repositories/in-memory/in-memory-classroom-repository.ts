import { Classroom } from "../../entities/classroom";
import { ClassroomRepository } from "../classroom-repository";

export class InMemoryClassroomRepository implements ClassroomRepository {
    classrooms: Classroom[] = [];

    async create(classroom: Classroom) {
        this.classrooms.push(classroom)
        return classroom;
    }
    async delete(classroomId: string){
        const targetClassroom = this.classrooms.find(classroom => classroom.id === classroomId)
        this.classrooms = this.classrooms.filter(classroom => classroom.id !== classroomId)
        return targetClassroom ?? null
    }
}