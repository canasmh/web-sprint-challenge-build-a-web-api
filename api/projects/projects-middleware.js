// add middlewares here related to projects
const projectMethods = require('./projects-model');

async function checkID(req, res, next) {
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
    !req.body.name ||
    !req.body.name.trim() ||
    !req.body.description || 
    !req.body.description.trim()
    ? next({status:400, message: "name and description are required"})
    : next();
}

function checkCompleted(req, res, next) {
    req.body.completed === undefined 
    ? next({status:400, message: "completed status required"}) 
    : next();
}


module.exports = {checkParams, checkCompleted, checkID}
