import { Router } from "express";
import { 
    createClassroomScheduleSchema,
    createClassroomSchema, 
    getClassroomsByAcademySchema, 
    handleCreateClassroom, 
    handleCreateClassroomSchedules,
    handleGetClassroomsByAcademy 
} from "../handlers/classroomHandlers";
import { validateInput } from "../middlewares/validateInput";

const classroomRoutes = Router()

classroomRoutes.get(
    '/classroom',
    validateInput(getClassroomsByAcademySchema),
    handleGetClassroomsByAcademy
)
classroomRoutes.post(
    '/classroom/create',
    validateInput(createClassroomSchema),
    handleCreateClassroom
)

classroomRoutes.post(
    '/classroom/schedule/create',
    validateInput(createClassroomScheduleSchema),
    handleCreateClassroomSchedules
)

export {classroomRoutes}