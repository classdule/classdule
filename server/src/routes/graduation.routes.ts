import { Router } from "express";
import { handleGetGraduations, handleCreateGraduation } from "../handlers/graduationHandlers";

const beltRoutes = Router()

beltRoutes.get('/graduations', handleGetGraduations)
beltRoutes.post('/graduation/create', handleCreateGraduation)

export {beltRoutes}