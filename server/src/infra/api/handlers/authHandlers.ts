import { Request, Response } from "express";

import { z } from "zod";
import { JwtWebProvider } from "../providers/jwt-web-provider";
import { JwtRefreshWebProvider } from "../providers/jwt-refresh-web-provider";
import { UserRepositoryPrisma } from "../../database/prisma/repositories/prisma-user-repository";
import { password } from "../../../schemas";
import { Signin } from "../../../app/services/auth/sign-in";

export const signinSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: password,
  }),
});

type handleSigninRequest = z.TypeOf<typeof signinSchema>;
export async function handleSignin(
  req: Request<{}, {}, handleSigninRequest["body"]>,
  res: Response
) {
  const { email, password } = req.body;
  const jwtProvider = new JwtRefreshWebProvider();
  const signin = new Signin(new UserRepositoryPrisma(), jwtProvider);
  try {
    const { token } = await signin.execute(email, password);

    return res.status(200).json({
      refresh_token: token,
    });
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.status(400).json({
      error: errMessage,
    });
  }
}
export const refreshSchema = z.object({
  body: z.object({
    user: z.object({
      id: z.string(),
    }),
  }),
});
type handleRefreshRequest = z.TypeOf<typeof refreshSchema>;
export async function handleRefresh(
  req: Request<{}, {}, handleRefreshRequest["body"]>,
  res: Response
) {
  const { user } = req.body;
  const jwtProvider = new JwtWebProvider();
  const token = await jwtProvider.sign({ id: user.id });
  return res.json({
    access_token: token,
  });
}
