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
import { validateInput } from "../middlewares/validateInput";
import { jwtVerifyToken } from "../middlewares/jwt-verify-token";

const groupRoutes = Router();

groupRoutes.get("/group", handleGetGroups);
groupRoutes.post(
  "/group",
  [jwtVerifyToken, validateInput(createGroupSchema)],
  handleCreateGroup
);

groupRoutes.post(
  "/group/join",
  [jwtVerifyToken, validateInput(createMembershipSchema)],
  handleCreateMembership
);
groupRoutes.post(
  "/group/request/accept",
  [jwtVerifyToken, validateInput(acceptMembershipRequestSchema)],
  handleAcceptMembershipRequest
);
groupRoutes.delete(
  "/group/request",
  [jwtVerifyToken, validateInput(denyMembershipRequestSchema)],
  handleDenyMembershipRequest
);

export { groupRoutes };
