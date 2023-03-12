import { passport } from "../../auth/passport";

export const jwtVerifyToken = passport.authenticate("jwt", { session: false });
