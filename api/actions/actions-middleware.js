// add middlewares here related to actions
const actionMethods = require('./actions-model');
const projectMethods = require('../projects/projects-model');

async function checkActionID(req, res, next) {
    const id = req.params.id;

    try {
        const action = await actionMethods.get(id);

        !action
        ? next({status: 404, message: `Sorry, no action with id ${id} was found`})
        : next();
    } catch (err) {
        next(err);
    }
}

async function checkProjectID(req, res, next) {
    const id = req.params.id;

    try {
        const project = await projectMethods.get(id);

        !project
        ? next({status: 404, message: `Sorry, no project with id ${id} was found`})
        : next();
    } catch (err) {
        next(err);
    }
}
function checkParams(req, res, next) {
    !req.body.project_ID ||
    !req.body.project_ID.trim() ||
    !req.body.description || 
    !req.body.description.trim()
    !req.body.notes ||
    !req.body.notes.trim()
    ? next({status:400, message: "project id, description, and notes are required"})
    : next();
}

function checkCompleted(req, res, next) {
    req.body.completed === undefined 
    ? next({status:400, message: "completed status required"}) 
    : next();
}


module.exports = {checkParams, checkCompleted, checkActionID, checkProjectID}
