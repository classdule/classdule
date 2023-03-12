import { Router } from "express";

import {
  handleSignin,
  signinSchema,
  handleRefresh,
  refreshSchema,
} from "../handlers/authHandlers";
import { jwtVerifyRefreshToken } from "../middlewares/jwt-verify-token";
import { validateInput } from "../middlewares/validateInput";

const authRoutes = Router();

authRoutes.post("/auth/signin", [validateInput(signinSchema)], handleSignin);
authRoutes.post(
  "/auth/refresh",
  [jwtVerifyRefreshToken, validateInput(refreshSchema)],
  handleRefresh
);

export { authRoutes };
