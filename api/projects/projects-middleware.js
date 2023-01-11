// add middlewares here related to projects

async function checkParams(req, res, next) {
    // console.log('query')
    // console.log(req.query);
    console.log('body');
    console.log(req.body);

    console.log(req.body.name);
    // console.log('params');
    // console.log(req.params);

    // const body = await req.body;
    // console.log(body);
    next();

    // !req.body.name ||
    // !req.body.name.trim() ||
    // !req.body.description || 
    // !req.body.description.trim()
    // ? next({status:400, message: "name and description are required"})
    // : next();
}


module.exports = {
    checkParams
}
