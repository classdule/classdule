import Jwt from 'jsonwebtoken';

import { JwtProvider, UserJWT } from "../../src/app/providers/jwt-provider";

export class JwtMockProvider implements JwtProvider {
  async sign(payload: UserJWT) {
    const token = Jwt.sign(payload, '77a40129-7a96-4957-b296-1028a04832a4');
    return token;
  }
}