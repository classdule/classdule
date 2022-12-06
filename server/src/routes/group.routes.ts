import { Router } from "express";
import {
  createGroupSchema,
  handleCreateGroup,
  handleGetGroups,
} from "../handlers/groupHandlers";
import { validateInput } from "../middlewares/validateInput";

const groupRoutes = Router();

groupRoutes.get("/group", handleGetGroups);
groupRoutes.post(
  "/group",
  [validateInput(createGroupSchema)],
  handleCreateGroup
);

export { groupRoutes };
