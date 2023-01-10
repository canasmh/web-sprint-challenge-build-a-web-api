// Write your "projects" router here!

const express = require('express');
const router = express.Router();
const projectModels = require('./projects-model');


router.get('/', async (req, res) => {
    // RETURNS AN ARRAY OF PROJECTS AS THE BODY OF THE RESPONSE
    // IF THERE ARE NO PROJECTS IT RESPONDS WITH AN EMPTY ARRAY

    const data = await projectModels.get();
    res.status(200).json(data);
})

router.get('/:id', async (req, res) => {
    // RETURNS A PROJECT WITH THE GIVEN ID AS THE BODY OF THE RESPONSE
    // IF THERE IS NO PROJECT WITH THE GIVEN ID IT RESPONDS WITH A STATUS CODE 404
    const id = req.params.id;
    const data = await projectModels.get(id);
    if (!data) {
        res.sendStatus(404);
    } else {
        res.status(200).json(data);
    };
})

router.post('/', async (req, res) => {
    const name = req.query.name;
    const description = req.query.description;
    const completed = req.query.completed;

    // RETURNS THE NEWLY CREATED PROJECT AS THE BODY OF THE RESPONSE.
    // IF THE REQUEST BODY IS MISSING ANY OF THE REQUIRED FIELDS IT RESPONDS WITH A STATUS CODE 400

    if (!name || !description) {
        res.sendStatus(400);
    } else {
        const newData = {"name": name, "description": description, "completed": completed === undefined ? false : completed};
        const data = await projectModels.insert(newData);
        res.status(200).json(newData);
    }
})

router.put('/:id', async (req, res) => {

    const id = req.params.id;
    const name = req.query.name;
    const description = req.query.description;
    const completed = req.query.completed;
    console.log('completed', completed)
    const oldData = await projectModels.get(id);

    // 
    if (!oldData) {
        res.sendStatus(404);
    } else {
        if (name === undefined || description === undefined || completed === undefined) {
            res.sendStatus(400);
        } else {
            const newData = {"name": name, "description": description, "completed": completed}
            const data = await projectModels.update(id, newData);
            console.log(data);
            console.log(data);
            res.json(newData);
        }

        
        
    };
    // RETURNS THE UPDATED PROJECT AS THE BODY OF THE RESPONSE
    // IF THERE IS NO PROJECT WITH THE GIVEN ID IT RESPONDS WITH A STATUS CODE 404
    // IF THE REQUEST BODY IS MISSING ANY OF THE REQUIRED FIELDS IT RESPONDS WITH A STATUS CODE 400
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const project = await projectModels.get(id)

    if (!project) {
        res.sendStatus(404);
    } else {
        const deletedProject = await projectModels.remove(id);
        res.sendStatus(200);
    }
    // RETURNS NO RESPONSE BODY
    // IF THERE IS NO PROJECT WITH THE GIVEN ID IT RESPONDS WITH A STATUS CODE 404
})

router.get('/api/projects/:id/actions', (req, res) => {
    // RETURNS AN ARRAY OF ACTIONS (COULD BE EMPTY) BELONGING TO A PROJECT WITH THE GIVEN ID
    // IF THERE IS NO PROJECT WITH THE GIVEN ID IT RESPONDS WITH A STATUS CODE 404
})

module.exports = router;