// 
const express = require('express');

// 
const userRouter = require('./userRoute');

// 
const server = express();

// 
server.use(express.json());

// 
server.use('/api/posts', userRouter);

// 
module.exports = server;