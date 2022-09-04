import { Router } from "express";
import { 
    createClassroomSchema, 
    getClassroomsByAcademySchema, 
    handleCreateClassroom, 
    handleGetClassroomByAcademy 
} from "../handlers/classroomHandlers";
import { validateInput } from "../middlewares/validateInput";

const classroomRoutes = Router()

classroomRoutes.get(
    '/classroom',
    validateInput(getClassroomsByAcademySchema),
    handleGetClassroomByAcademy
)
classroomRoutes.post(
    '/classroom/create',
    validateInput(createClassroomSchema),
    handleCreateClassroom
)

export {classroomRoutes}