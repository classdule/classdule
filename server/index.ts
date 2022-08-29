import { config } from 'dotenv'
config()

import {createServer} from './src/app'

const PORT = process.env.PORT || 3000

const server = createServer()

server.listen(PORT, ()=> {
    console.log(`App running on http://localhost:${PORT}`)
})