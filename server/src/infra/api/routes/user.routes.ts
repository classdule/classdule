import { Router } from "express";
import {} from "passport";
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
import { verifyToken } from "../middlewares/verifyToken";

const userRoutes = Router();

userRoutes.get("/user", handleGetUsers);
userRoutes.get(
  "/user/account",
  [passport.authenticate("jwt")],
  handleGetAccountInfo
);
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
