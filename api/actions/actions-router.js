// Write your "actions" router here!

const express = require('express');
const router = express.Router();
const actionMethods = require('./actions-model');
const projectMethods = require('../projects/projects-model');
const { checkParams, checkCompleted, checkActionID, checkProjectID } = require('./actions-middleware');

router.get('/', async (req, res) => {
    // RETURNS AN ARRAY OF ACTIONS (OR AN EMPTY ARRAY) AS THE BODY OF THE RESPONSE;
    const data = await actionMethods.get(null);

    res.status(200).send(data);
})

router.get('/:id', checkActionID, async (req, res, next) => {
    // Returns an action with the given id as the body of the response.
    // if there is no action with the given id it responds with a status code 404
    try {
        const action = await actionMethods.get(req.params.id);
        res.status(200).json(action);
    } catch (err) {
        next(err);
    }
})

router.post('/', checkParams, async (req, res, next) => {
    // Returns the newly created action as the body of the response.
    // If the request body is missing any of the required fields it responds with a status code 400.
    // when adding an action make sure the project_id provided belongs to an existing project
    try {
        const insertedAction = await actionMethods.insert(req.body);
        res.status(201).send(insertedAction)
    } catch (err) {
        next(err);
    }

})

router.put('/:id', checkActionID, checkParams, checkCompleted, async (req, res, next) => {

    // Returns the updated action as the body of the response.
    // If there is no action with the given id it responds with a status code 404.
    // If the request body is missing any of the required fields it responds with a status code 400.
    try {
        const updatedAction = await actionMethods.update(req.params.id, req.body);
        res.status(200).send(updatedAction);
    } catch(err) {
        next(err);
    }
})

router.delete('/:id', checkActionID, async (req, res, next) => {
    // Returns no response body.
    // If there is no action with the given id it responds with a status code 404.

    try {
        const deletedAction = await actionMethods.remove(req.params.id);
        res.sendStatus(204);
    } catch(err) {
        next(err);
    }
})

module.exports = router;
