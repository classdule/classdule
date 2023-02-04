import "express-async-errors";

import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import { mainRoutes } from "./infra/api/routes/main.routes";
import { authRoutes } from "./infra/api/routes/auth.routes";
import { userRoutes } from "./infra/api/routes/user.routes";
import { groupRoutes } from "./infra/api/routes/group.routes";
import { classroomRoutes } from "./infra/api/routes/classroom.routes";

export function createServer() {
  const App = express();

  App.use(
    express.json(),
    express.raw(),
    cookieParser(),
    cors(),
    mainRoutes,
    authRoutes,
    userRoutes,
    groupRoutes,
    classroomRoutes
  );
  return App;
}
