const express = require('express');
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(express.urlencoded());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);



server.get('/', (req, res) => {
    console.log('on the home route')
    res.send('Hello from the GET /')
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({message: process.env.NODE_ENV === 'PRODUCTION' ? 'sorry, there was an erorr' : err.message})
})

module.exports = server;
