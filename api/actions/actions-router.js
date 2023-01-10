// Write your "actions" router here!

const express = require('express');
const router = express.Router();
const actionMethods = require('./actions-model');
const projectMethods = require('../projects/projects-model');

router.get('/', async (req, res) => {
    // RETURNS AN ARRAY OF ACTIONS (OR AN EMPTY ARRAY) AS THE BODY OF THE RESPONSE;
    const data = await actionMethods.get(null);

    res.status(200).send(data);
})

router.get('/:id', async (req, res) => {
    // Returns an action with the given id as the body of the response.
    // if there is no action with the given id it responds with a status code 404
    const id = req.params.id;
    const action = await actionMethods.get(id);

    if (!action) {
        res.sendStatus(404);
    } else {
        res.status(200).json(action);
    }
})

router.post('/', async (req, res) => {
    // Returns the newly created action as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
    // when adding an action make sure the project_id provided belongs to an existing project
    const project_id = req.query.project_id;
    const description = req.query.description;
    const notes = req.query.notes;
    const completed = req.query.completed;

    if (project_id === undefined || description === undefined || notes === undefined) {
        res.sendStatus(400);

    } else {
        const projectData = await projectMethods.get(project_id)

        if (!projectData) {
            res.sendStatus(400);

        } else {
            const newData = {
                "project_id": project_id,
                "description": description,
                "notes": notes,
                "completed": completed === undefined ? false : completed
            };
    
            const data = await actionMethods.insert(newData);
            res.status(200).json(newData);
        }   
    }
})

router.put('/:id', async (req, res) => {

    // Returns the updated action as the body of the response.
    // If there is no action with the given id it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.

    const id = req.params.id;
    const currentData = await actionMethods.get(id);
    const project_id = req.query.project_id;
    const description = req.query.description;
    const notes = req.query.notes;
    const completed = req.query.completed;

    if (!currentData) {
        res.sendStatus(404);

    } else {
        if (project_id === undefined || description === undefined || notes === undefined || completed === undefined) {
            res.sendStatus(400);
        } else {

            const newData = {
                [project_id]: project_id,
                [description]: description,
                [notes]: notes,
                [completed]: completed
            }

            const data = await actionMethods.update(id, newData);

            res.status(200).send(data);
        }
    }
    
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const action = await actionMethods.get(id);

    if (!action) {
        res.sendStatus(404);
    } else {
        const del = await actionMethods.remove(id);
        res.sendStatus(200);
    }
    // Returns no response body.
    // If there is no action with the given id it responds with a status code 404.
})

module.exports = router;
