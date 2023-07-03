const path = require('path')

/**
 * Set Configurations parameters such as:
 * baseDir -> the base directory of the project
 * storageDir -> directory to store files in,
 * @returns object -> Configuration object
 */
const loadConfig = () => {
    let config = {}
    config.baseDir = __dirname
    config.storageDir = [config.baseDir, 'files'].join(path.sep)
    return config


}

module.exports = { loadConfig }