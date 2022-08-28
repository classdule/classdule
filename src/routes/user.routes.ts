import { Router } from "express";
import { handleChangeUsername, handleCreateUser } from "../handlers/userHandlers";
import { verifyToken } from "../middlewares/verifyToken";

const userRoutes = Router()

userRoutes.post('/user/create', handleCreateUser)
userRoutes.post(
    '/user/changeUserName', 
    [verifyToken],
    handleChangeUsername
)

export {userRoutes}