import { Request, Response } from "express";

import { z } from "zod";
import { JwtWebProvider } from "../providers/jwt-web-provider";
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
  const jwtProvider = new JwtWebProvider();
  const signin = new Signin(new UserRepositoryPrisma(), jwtProvider);
  try {
    const { token } = await signin.execute(email, password);

    res.cookie("access_token", token);
    return res.status(200).json({
      error: "Sucessfully authenticated",
    });
  } catch (err) {
    let errMessage = "Unknown error";
    if (err instanceof Error) errMessage = err.message;
    return res.status(400).json({
      error: errMessage,
    });
  }
}
