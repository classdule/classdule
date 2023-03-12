import Jwt from "jsonwebtoken";

import { JwtProvider, UserJWT } from "../../../app/providers/jwt-provider";

export class JwtRefreshWebProvider implements JwtProvider {
  async sign(payload: UserJWT) {
    const token = Jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as Jwt.Secret,
      { expiresIn: "12h" }
    );
    return token;
  }
}
