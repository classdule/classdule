import { Router } from "express";
import {
  handleChangeUsername,
  handleCreateUser,
  handleDeleteUser,
  handleGetUsers,
  createUserSchema,
  changeUsernameSchema,
  deleteUserSchema,
  getUserInfoSchema,
  handleGetUserInfo,
  handleGetAccountInfo,
} from "../handlers/userHandlers";
import { validateInput } from "../infra/middlewares/validateInput";
import { verifyToken } from "../infra/middlewares/verifyToken";

const userRoutes = Router();

userRoutes.get("/user", handleGetUsers);
userRoutes.get("/user/account", [verifyToken], handleGetAccountInfo);
userRoutes.post("/user", [validateInput(createUserSchema)], handleCreateUser);
userRoutes.post(
  "/user/changeUserName",
  [verifyToken, validateInput(changeUsernameSchema)],
  handleChangeUsername
);
userRoutes.delete(
  "/user",
  [verifyToken, validateInput(deleteUserSchema)],
  handleDeleteUser
);
userRoutes.get(
  "/user/:id",
  [validateInput(getUserInfoSchema)],
  handleGetUserInfo
);

export { userRoutes };
