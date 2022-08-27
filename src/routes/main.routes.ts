import { Request, Response, Router } from "express";
import { getUsers } from "../services/getUsers";

const mainRoutes = Router()

mainRoutes.get('/', async (req:Request, res:Response) => {
    const users = await getUsers()
    res.json(users)
})

export {mainRoutes}