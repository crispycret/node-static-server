const handlers = require('./handlers')


/**
 * Given an express application, map request routes to handler methods.
 * @param {*} app 
 * @returns 
 */
const defineRoutes = (app) => {

    app.get('/static', handlers.retrieveFileHandler)
    app.get('/static/*', handlers.retrieveFileHandler)

    app.get('/dynamic', handlers.retrieveFileFromURL)
    app.get('/dynamic/*', handlers.retrieveFileFromURL)

    return app
}



module.exports = { defineRoutes }