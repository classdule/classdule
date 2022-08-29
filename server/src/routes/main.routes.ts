import { Request, Response, Router } from "express";

const mainRoutes = Router()

mainRoutes.get('/', (req:Request, res:Response) => {
    return res.json({
        status:'Server running'
    })
})

export {mainRoutes}