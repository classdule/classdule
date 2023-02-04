import { Router } from "express";
import {
  createGroupSchema,
  handleCreateGroup,
  handleGetGroups,
} from "../handlers/groupHandlers";
import {
  acceptMembershipRequestSchema,
  createMembershipSchema,
  denyMembershipRequestSchema,
  handleAcceptMembershipRequest,
  handleCreateMembership,
  handleDenyMembershipRequest,
} from "../handlers/membership-handlers";
import { validateInput } from "../infra/middlewares/validateInput";
import { verifyToken } from "../infra/middlewares/verifyToken";

const groupRoutes = Router();

groupRoutes.get("/group", handleGetGroups);
groupRoutes.post(
  "/group",
  [verifyToken, validateInput(createGroupSchema)],
  handleCreateGroup
);

groupRoutes.post(
  "/group/join",
  [verifyToken, validateInput(createMembershipSchema)],
  handleCreateMembership
);
groupRoutes.post(
  "/group/request/accept",
  [verifyToken, validateInput(acceptMembershipRequestSchema)],
  handleAcceptMembershipRequest
);
groupRoutes.delete(
  "/group/request",
  [verifyToken, validateInput(denyMembershipRequestSchema)],
  handleDenyMembershipRequest
);

export { groupRoutes };
