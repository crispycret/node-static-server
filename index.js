const express = require('express');
const cors = require('cors');

const { loadConfig } = require('./config');
const routes = require('./src/routes')


const config = loadConfig()

// Create Express application
let app = express();

// Allow All Cross Origin requests
app.use(cors({
    origin: '*'
}));

// Load the defined routes
app = routes.defineRoutes(app)

// Listen on the given port
app.listen(3001, () => {
  console.log('Proxy server listening on port 3001');
})