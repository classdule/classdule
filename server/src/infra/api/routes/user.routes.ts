import { Router } from "express";
import { passport } from "../../auth/passport";
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
import { validateInput } from "../middlewares/validateInput";
import { jwtVerifyToken } from "../middlewares/jwt-verify-token";

const userRoutes = Router();

userRoutes.get("/user", handleGetUsers);
userRoutes.get("/user/account", [jwtVerifyToken], handleGetAccountInfo);
userRoutes.post("/user", [validateInput(createUserSchema)], handleCreateUser);
userRoutes.post(
  "/user/changeUserName",
  [jwtVerifyToken, validateInput(changeUsernameSchema)],
  handleChangeUsername
);
userRoutes.delete(
  "/user",
  [jwtVerifyToken, validateInput(deleteUserSchema)],
  handleDeleteUser
);
userRoutes.get(
  "/user/:id",
  [validateInput(getUserInfoSchema)],
  handleGetUserInfo
);

export { userRoutes };
