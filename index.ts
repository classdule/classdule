import express from 'express'

const App = express()

App.use(express.json())

const PORT = process.env.PORT || 3000

App.listen(PORT, ()=> {
    console.log(`App running on http://localhost:${PORT}`)
})

console.log('Hello world')