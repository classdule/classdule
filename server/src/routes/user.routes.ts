import { Router } from "express";
import { 
    handleChangeUsername, 
    handleCreateUser, 
    handleDeleteUser, 
    handleGetUsers,
    createUserSchema,
    changeUsernameSchema,
    deleteUserSchema
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
    [verifyToken, validateInput(changeUsernameSchema)],
    handleChangeUsername
)
userRoutes.delete(
    '/user/delete',
    [verifyToken, validateInput(deleteUserSchema)],
    handleDeleteUser
)

export {userRoutes}