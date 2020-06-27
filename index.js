// const express = require('express')

// routers
// const userRouter = require('./userRoute');

// const server = express()

const server = require('./server');

// server.use(express.json())
// server.use('/', welcomeRouter)

server.listen(5000, () => {
    console.log('Fire up the doomship!')
})


