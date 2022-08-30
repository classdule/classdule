import { Router } from "express";

import {validateInput} from '../middlewares/validateInput'

import { 
    handleGetGraduations, 
    handleCreateGraduation,
    createGraduationSchema
} from "../handlers/graduationHandlers";

const beltRoutes = Router()

beltRoutes.get('/graduations', handleGetGraduations)
beltRoutes.post(
    '/graduation/create', 
    [validateInput(createGraduationSchema)],
    handleCreateGraduation
)

export {beltRoutes}