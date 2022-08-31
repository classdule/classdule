import { Router } from "express";

import { handleSignin, signinSchema } from "../handlers/authHandlers";
import { validateInput } from "../middlewares/validateInput";

const authRoutes = Router()

authRoutes.post(
    '/signin',
    [validateInput(signinSchema)],
    handleSignin
)

export {authRoutes}