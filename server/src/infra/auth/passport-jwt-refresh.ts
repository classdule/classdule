import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserJWT } from "../../app/providers/jwt-provider";

export const jwtRefreshStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_REFRESH_SECRET,
    passReqToCallback: true,
    jsonWebTokenOptions: {
      maxAge: "12h",
    },
  },
  (req: Request, payload: UserJWT, done: any) => {
    req.body.user = { id: payload.id };
    return done(null, payload);
  }
);
