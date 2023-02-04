import { Router } from "express";

import { handleSignin, signinSchema } from "../handlers/authHandlers";
import { validateInput } from "../infra/middlewares/validateInput";

const authRoutes = Router();

authRoutes.post("/auth/signin", [validateInput(signinSchema)], handleSignin);

export { authRoutes };
