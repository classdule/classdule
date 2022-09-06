import { Router } from "express";
import { createCheckinSchema, handleCreateCheckin, handleGetCheckins, handleVerifyCheckin, verifyCheckinSchema } from "../handlers/checkinHandlers";
import { 
    createClassroomScheduleSchema,
    createClassroomSchema, 
    getClassroomsByAcademySchema, 
    handleCreateClassroom, 
    handleCreateClassroomSchedules,
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

classroomRoutes.post(
    '/classroom/schedule/create',
    validateInput(createClassroomScheduleSchema),
    handleCreateClassroomSchedules
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