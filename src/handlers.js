const PATH = require('path')
const fetch = require('node-fetch')

const { isFile, isDir, readDirectory, readFile } = require('./utils')

const { loadConfig } = require('../config')
const config = loadConfig()

/**
 * Retrieve an object that shows either
 * A:) A tree like object that describes the the requested path if it is a directory (recursive, depth)
 * B:) A Promise to handle the contents of a file object
 * @param {*} req -> Express Route Request
 * @param {*} res -> Express Route Response
 */
const retrieveFileHandler = async (req, res) => {
    try {
        // Combine the extra path with the base directory to get the full path
        const filePath = [config.storageDir, req.params[0]].join(PATH.sep);

        let response = null
        if (await isFile(filePath)) {
            response = await readFile(filePath)
        } else {
            // get parameters for directory search or use default values
            let recursive = req.query.recursive ? req.query.recursive === 'true' : true
            let depth = Number.parseInt(req.query.depth || '-1')
            response = await readDirectory(filePath, recursive, depth)
        }

        res.send(response)
      
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}



const retrieveFileFromURL = async (req, res) => {
    try {
        // make a request to the url to retrieve the file
        fetch(req.query.url)
        // .then (response => response.arrayBuffer())
        .then (response => response.buffer())
        .then (data => {
            console.log(data)
            // forward the file to the requester
            res.send(data)
        })

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}
  

module.exports = { retrieveFileHandler, retrieveFileFromURL }


