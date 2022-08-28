import { config } from 'dotenv'
config()

import express from 'express'

import {mainRoutes} from './src/routes/main.routes'
import {authRoutes} from './src/routes/auth.routes'

const App = express()

App.use(
    express.json(),
    mainRoutes,
    authRoutes
)

const PORT = process.env.PORT || 3000

App.listen(PORT, ()=> {
    console.log(`App running on http://localhost:${PORT}`)
})