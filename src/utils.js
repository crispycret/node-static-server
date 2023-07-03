const fs = require('fs');
const PATH = require('path');

const {loadConfig} = require('../config')
const config = loadConfig()


/**
 * Return a boolean that represents if the path is an existing directory or not. 
 * @param {string} path 
 * @returns 
 */
async function isDir(path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, fStat) => {
        if (err) {
            reject(err)
            return
        }
          resolve(fStat.isDirectory())
      })
    })
  }

  
/**
 * Return a boolean that represents if the given path is an existing file. 
 * @param {string} path 
 * @returns 
 */
async function isFile(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, fStat) => {
            if (err) {
                console.log(`isFile -> ${err}`)
                reject(err)
                return
            }
            resolve(fStat.isFile())
        })
    })
}



/**
 * Returns a list of files at the given directory. 
 * @param {string} path 
 * @returns Promise<Object>
 */
async function fsReaddirWrapper(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
                return 
            } 
            resolve(files);
        });
    });
}




/**
 * 
 * @param {*} path 
 * @returns object -> Object classification of files in their directory
 */
const readDirectory = async (path, recursive=true, depth=-1, _depth=0) => {
  
    const files = {}
    let key = path.replace(config.storageDir, '') 
    files[key] = await fsReaddirWrapper(path)
  
    if (!recursive) return files[key]

    await Promise.all(
      files[key].map(async (fname) => {
        const tempPath = PATH.join(path, fname);
        const _isDir = await isDir(tempPath);

        // Recursively call this function if the path is a directory.
        // Make sure depth restrictions are being followed if enabled (depth=-1 -> disabled)
        if (_isDir) {
            if (depth === -1 || depth > _depth) {
                const tempKey = tempPath.replace(config.storageDir, '');
                files[tempKey] = await readDirectory(tempPath, recursive, depth, _depth+1);
            }
        }
      })
    )
    return files
  }
  
  

const readFile = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err)
                console.log(`readFile -> ${err}`)
                return;
            }
            console.log(data)
            resolve(data)
        })
    })
}


  module.exports = {
    isDir,
    isFile,
    readDirectory, 
    readFile,
  }