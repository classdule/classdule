import { Router } from "express";
import { createCheckinSchema, handleCreateCheckin, handleGetCheckins, handleVerifyCheckin, verifyCheckinSchema } from "../handlers/checkinHandlers";
import { 
    createClassroomSchema, 
    deleteClassroomSchema, 
    getClassroomsByAcademySchema, 
    handleCreateClassroom, 
    handleDeleteClassroom,
    handleGetClassroomsByAcademy 
} from "../handlers/classroomHandlers";
import { validateInput } from "../middlewares/validateInput";
import { verifyToken } from "../middlewares/verifyToken";

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
classroomRoutes.delete(
    '/classroom/delete',
    [validateInput(deleteClassroomSchema)],
    handleDeleteClassroom
)

classroomRoutes.get(
    '/classroom/checkins',
    handleGetCheckins
)
classroomRoutes.post(
    '/classroom/checkin/create',
    [
        verifyToken,
        validateInput(createCheckinSchema)
    ],
    handleCreateCheckin
)
classroomRoutes.post(
    '/classroom/checkin/status',
    [validateInput(verifyCheckinSchema)],
    handleVerifyCheckin
)

export {classroomRoutes}