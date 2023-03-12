import { Passport } from "passport";

import { jwtStrategy } from "./passport-jwt";
import { jwtRefreshStrategy } from "./passport-jwt-refresh";

const passport = new Passport();
passport.use("jwt", jwtStrategy);
passport.use("jwt-refresh", jwtRefreshStrategy);
export { passport };
