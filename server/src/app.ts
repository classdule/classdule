import express from 'express'

import cors from 'cors'

import { mainRoutes } from './routes/main.routes'
import { authRoutes } from './routes/auth.routes'
import { userRoutes } from './routes/user.routes'
import { beltRoutes } from './routes/belt.routes'

export function createServer(){
    const App = express()

    App.use(
        express.json(),
        cors(),
        mainRoutes,
        authRoutes,
        userRoutes,
        beltRoutes
    )
    return App
}