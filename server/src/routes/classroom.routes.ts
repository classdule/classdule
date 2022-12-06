import { Router } from "express";
import {
  createCheckinSchema,
  handleCreateCheckin,
  handleVerifyCheckin,
  verifyCheckinSchema,
} from "../handlers/checkinHandlers";
import {
  createClassroomSchema,
  deleteClassroomSchema,
  getClassroomsByGroupSchema,
  handleCreateClassroom,
  handleDeleteClassroom,
  handleGetClassroomsByGroup,
} from "../handlers/classroomHandlers";
import { validateInput } from "../middlewares/validateInput";
import { verifyToken } from "../middlewares/verifyToken";

const classroomRoutes = Router();

classroomRoutes.get(
  "/classroom",
  validateInput(getClassroomsByGroupSchema),
  handleGetClassroomsByGroup
);
classroomRoutes.post(
  "/classroom/create",
  [verifyToken, validateInput(createClassroomSchema)],
  handleCreateClassroom
);
classroomRoutes.delete(
  "/classroom/delete",
  [validateInput(deleteClassroomSchema)],
  handleDeleteClassroom
);

classroomRoutes.post(
  "/classroom/checkin/create",
  [verifyToken, validateInput(createCheckinSchema)],
  handleCreateCheckin
);
classroomRoutes.post(
  "/classroom/checkin/status",
  [verifyToken, validateInput(verifyCheckinSchema)],
  handleVerifyCheckin
);

export { classroomRoutes };
