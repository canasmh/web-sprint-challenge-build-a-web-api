const express = require('express');
const projectsRouter = require('./projects/projects-router');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

// server.get('/', (req, res) => {
//     res.send('API up and running!');
// })

server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    console.log('on the home route')
    res.send('Hello from the GET /')
})

module.exports = server;
