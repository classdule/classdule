import Jwt from 'jsonwebtoken';

import { JwtProvider, UserJWT } from "../app/providers/jwt-provider";

export class JwtWebProvider implements JwtProvider {
  async sign(payload: UserJWT) {
    const token = Jwt.sign(payload, process.env.JWT_SECRET as Jwt.Secret);
    return token;
  }
}