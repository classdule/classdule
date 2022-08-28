import { Router } from "express";
import { handleGetBelts } from "../handlers/beltHandlers";

const beltRoutes = Router()

beltRoutes.get('/belts', handleGetBelts)

export {beltRoutes}