import { config } from 'dotenv'
config()

import express from 'express'

import { mainRoutes } from './src/routes/main.routes'
import { authRoutes } from './src/routes/auth.routes'
import { userRoutes } from './src/routes/user.routes'
import { beltRoutes } from './src/routes/belt.routes'

export function createServer(){
    const App = express()

    App.use(
        express.json(),
        mainRoutes,
        authRoutes,
        userRoutes,
        beltRoutes
    )
    return App
}


const PORT = process.env.PORT || 3000

const server = createServer()

server.listen(PORT, ()=> {
    console.log(`App running on http://localhost:${PORT}`)
})