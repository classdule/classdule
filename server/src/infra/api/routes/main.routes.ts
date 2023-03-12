import { Request, Response, Router } from "express";

const mainRoutes = Router();

mainRoutes.all("/", (_: Request, res: Response) => {
  return res.json({
    status: "Server running",
  });
});

export { mainRoutes };
