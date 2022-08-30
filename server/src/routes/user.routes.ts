import { Router } from "express";
import { 
    handleChangeUsername, 
    handleCreateUser, 
    handleDeleteUser, 
    handleGetUsers,
    createUserSchema
} from "../handlers/userHandlers";
import { validateInput } from "../middlewares/validateInput";
import { verifyToken } from "../middlewares/verifyToken";

const userRoutes = Router()

userRoutes.get('/users', handleGetUsers)
userRoutes.post(
    '/user/create',
    [validateInput(createUserSchema)],
    handleCreateUser
)
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