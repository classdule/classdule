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
import { jwtVerifyToken } from "../middlewares/jwt-verify-token";

const classroomRoutes = Router();

classroomRoutes.get(
  "/classroom",
  validateInput(getClassroomsByGroupSchema),
  handleGetClassroomsByGroup
);
classroomRoutes.post(
  "/classroom",
  [jwtVerifyToken, validateInput(createClassroomSchema)],
  handleCreateClassroom
);
classroomRoutes.delete(
  "/classroom",
  [validateInput(deleteClassroomSchema)],
  handleDeleteClassroom
);

classroomRoutes.post(
  "/classroom/checkin",
  [jwtVerifyToken, validateInput(createCheckinSchema)],
  handleCreateCheckin
);
classroomRoutes.post(
  "/classroom/checkin/status",
  [jwtVerifyToken, validateInput(verifyCheckinSchema)],
  handleVerifyCheckin
);

export { classroomRoutes };
