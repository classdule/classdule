import { Router } from "express";
import {
  createGroupSchema,
  handleCreateGroup,
  handleGetGroups,
} from "../handlers/groupHandlers";
import { validateInput } from "../middlewares/validateInput";
import { verifyToken } from "../middlewares/verifyToken";

const groupRoutes = Router();

groupRoutes.get("/group", handleGetGroups);
groupRoutes.post(
  "/group",
  [verifyToken, validateInput(createGroupSchema)],
  handleCreateGroup
);

export { groupRoutes };
