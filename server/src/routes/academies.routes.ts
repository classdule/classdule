import { Router } from "express";
import { createAcademySchema, handleCreateAcademy, handleGetAcademies } from "../handlers/academiesHandlers";
import { validateInput } from "../middlewares/validateInput";

const academiesRoutes = Router()

academiesRoutes.get('/academies', handleGetAcademies)
academiesRoutes.post(
    '/academy/create',
    [validateInput(createAcademySchema)],
    handleCreateAcademy
)

export {academiesRoutes}