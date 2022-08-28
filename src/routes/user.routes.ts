import { Router } from "express";
import { handleChangeUsername, handleCreateUser, handleDeleteUser, handleGetUsers } from "../handlers/userHandlers";
import { verifyToken } from "../middlewares/verifyToken";

const userRoutes = Router()

userRoutes.get('/users', handleGetUsers)
userRoutes.post('/user/create', handleCreateUser)
userRoutes.post(
    '/user/changeUserName',
    [verifyToken],
    handleChangeUsername
)
userRoutes.delete(
    '/user/delete',
    [verifyToken],
    handleDeleteUser
)

export {userRoutes}