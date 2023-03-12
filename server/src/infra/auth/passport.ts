import { Passport } from "passport";

import { jwtStrategy } from "./passport-jwt";

const passport = new Passport();
passport.use(jwtStrategy);
export { passport };
