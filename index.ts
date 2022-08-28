import { config } from 'dotenv'
config()

import express from 'express'

import {mainRoutes} from './src/routes/main.routes'
import {authRoutes} from './src/routes/auth.routes'
import { userRoutes } from './src/routes/user.routes'

const App = express()

App.use(
    express.json(),
    mainRoutes,
    authRoutes,
    userRoutes
)

const PORT = process.env.PORT || 3000

App.listen(PORT, ()=> {
    console.log(`App running on http://localhost:${PORT}`)
})