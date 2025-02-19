// Write your "projects" router here!

const express = require('express');
const router = express.Router();
const projectModels = require('./projects-model');
const { checkID, checkParams, checkCompleted} = require('./projects-middleware');


router.get('/', async (req, res) => {
    // RETURNS AN ARRAY OF PROJECTS AS THE BODY OF THE RESPONSE
    // IF THERE ARE NO PROJECTS IT RESPONDS WITH AN EMPTY ARRAY

    const data = await projectModels.get();
    res.status(200).json(data);
})

router.get('/:id', checkID, async (req, res) => {
    // RETURNS A PROJECT WITH THE GIVEN ID AS THE BODY OF THE RESPONSE
    // IF THERE IS NO PROJECT WITH THE GIVEN ID IT RESPONDS WITH A STATUS CODE 404
    try {
        const project = await projectModels.get(req.params.id);
        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
})

router.post('/', checkParams, async (req, res, next) => {
    // RETURNS THE NEWLY CREATED PROJECT AS THE BODY OF THE RESPONSE.
    // IF THE REQUEST BODY IS MISSING ANY OF THE REQUIRED FIELDS IT RESPONDS WITH A STATUS CODE 400
    try {
        const insertedData = await projectModels.insert(req.body);
        res.status(201).json(insertedData);
    } catch (err) {
        next(err);
    }
})

router.put('/:id', checkID, checkParams, checkCompleted, async (req, res, next) => {
    // RETURNS THE UPDATED PROJECT AS THE BODY OF THE RESPONSE
    // IF THERE IS NO PROJECT WITH THE GIVEN ID IT RESPONDS WITH A STATUS CODE 404
    // IF THE REQUEST BODY IS MISSING ANY OF THE REQUIRED FIELDS IT RESPONDS WITH A STATUS CODE 400
    let completed = req.body.completed

    try {
        const updatedData = await projectModels.update(req.params.id, req.body)
        res.status(200).json(updatedData);
    } catch(err) {
        next(err);
    }
})

router.delete('/:id', checkID, async (req, res) => {
    // RETURNS NO RESPONSE BODY
    // IF THERE IS NO PROJECT WITH THE GIVEN ID IT RESPONDS WITH A STATUS CODE 404
    try {
        const deletedProject = await projectModels.remove(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
})

router.get('/:id/actions', async (req, res) => {
    const id = req.params.id;

    const project = projectModels.get(id);

    if (!project) {
        res.sendStatus(404);
    } else {
        const actions = await projectModels.getProjectActions(id);

        res.status(200).json(actions);
    }
})

module.exports = router;