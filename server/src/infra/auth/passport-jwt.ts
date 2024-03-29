import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserJWT } from "../../app/providers/jwt-provider";

export const jwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true,
    jsonWebTokenOptions: {
      maxAge: "60s",
    },
  },
  (req: Request, payload: UserJWT, done: any) => {
    req.body.user = { id: payload.id };
    return done(null, payload);
  }
);
