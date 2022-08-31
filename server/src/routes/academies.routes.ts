import { Router } from "express";
import { handleGetAcademies } from "../handlers/academiesHandlers";

const academiesRoutes = Router()

academiesRoutes.get('/academies', handleGetAcademies)

export {academiesRoutes}