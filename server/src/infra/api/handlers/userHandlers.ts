import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UserHttpMapper } from "../mappers/http/user.http-mapper";
import { PrismaCheckinRepository } from "../../database/prisma/repositories/prisma-checkin-repository";
import { UserRepositoryPrisma } from "../../../app/repositories/prisma/prisma-user-repository";
import { password, username } from "../../../schemas";
import { ChangeUserName } from "../../../app/services/user/change-username";
import { CreateUser } from "../../../app/services/user/create-user";
import { DeleteUser } from "../../../app/services/user/delete-user";
import { GetAllUsers } from "../../../app/services/user/get-all-users";
import { GetUserInfo } from "../../../app/services/user/get-user-info";

export async function handleGetUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const usersRepository = new UserRepositoryPrisma();
  const findUsers = new GetAllUsers(usersRepository);
  const queryResult = await findUsers.do();
  return res.status(200).json(queryResult.map(UserHttpMapper.toHttp));
}

export const createUserSchema = z.object({
  body: z.object({
    name: username,
    password: password,
    birthday: z.string({
      required_error: "Birthday is required",
    }),
    email: z.string().email(),
  }),
});
type handleCreateUserRequestBody = z.TypeOf<typeof createUserSchema>["body"];
export async function handleCreateUser(
  req: Request<{}, {}, handleCreateUserRequestBody>,
  res: Response
) {
  const { name, password, birthday, email } = req.body;
  const parsedBirthday = new Date(birthday);
  const createUser = new CreateUser(new UserRepositoryPrisma());

  try {
    await createUser.execute({
      birthDay: parsedBirthday,
      email,
      name,
      password,
    });

    return res.sendStatus(204);
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.status(400).json({
      error: errMessage,
    });
  }
}
export const changeUsernameSchema = z.object({
  body: z.object({
    name: z.string(),
    user: z.object({
      id: z.string(),
    }),
  }),
});
type ChangeUsernameRequest = z.TypeOf<typeof changeUsernameSchema>;
export async function handleChangeUsername(
  req: Request<{}, {}, ChangeUsernameRequest["body"]>,
  res: Response
) {
  const { name, user } = req.body;
  const userRepository = new UserRepositoryPrisma();
  const changeUsername = new ChangeUserName(userRepository);

  try {
    await changeUsername.execute(user.id, name);
    return res.status(204).json({
      message: "User name changed successfully",
    });
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.status(400).json({
      error: errMessage,
    });
  }
}
export const deleteUserSchema = z.object({
  body: z.object({
    user: z.object({
      id: z.string(),
    }),
  }),
});
type DeleteUserRequest = z.TypeOf<typeof deleteUserSchema>;
export async function handleDeleteUser(
  req: Request<{}, {}, DeleteUserRequest["body"]>,
  res: Response
) {
  const { user } = req.body;
  const deleteUser = new DeleteUser(new UserRepositoryPrisma());
  await deleteUser.execute(user.id);
  return res.json({
    message: `Deleted user with id ${user.id}`,
  });
}

export const getUserInfoSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

type GetUserInfoSchema = z.TypeOf<typeof getUserInfoSchema>;
export async function handleGetUserInfo(
  req: Request<GetUserInfoSchema["params"]>,
  res: Response
) {
  const { id } = req.params;
  const userRepository = new UserRepositoryPrisma();
  const checkinsRepository = new PrismaCheckinRepository();
  const getUserInfo = new GetUserInfo(userRepository, checkinsRepository);
  const { user } = await getUserInfo.do({
    userId: id,
  });
  if (!user) {
    return res.sendStatus(404);
  }
  return res.json(UserHttpMapper.toHttp(user));
}
export const getAccountInfoSchema = z.object({
  body: z.object({
    user: z.object({
      id: z.string(),
    }),
  }),
});

type GetAccountInfoSchema = z.TypeOf<typeof getAccountInfoSchema>;
export async function handleGetAccountInfo(
  req: Request<{}, {}, GetAccountInfoSchema["body"]>,
  res: Response
) {
  const { user } = req.body;
  const userRepository = new UserRepositoryPrisma();
  const checkinsRepository = new PrismaCheckinRepository();
  const getUserInfo = new GetUserInfo(userRepository, checkinsRepository);
  const { user: userInfo } = await getUserInfo.do({
    userId: user.id,
  });
  if (!userInfo) {
    return res.sendStatus(404);
  }
  return res.json(UserHttpMapper.toHttp(userInfo));
}
