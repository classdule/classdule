import { passport } from "../../auth/passport";

export const jwtVerifyToken = passport.authenticate("jwt", { session: false });
export const jwtVerifyRefreshToken = passport.authenticate("jwt-refresh", {
  session: false,
});
