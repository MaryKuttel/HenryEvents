const { Router } = require('express');

const { readdirSync } = require('fs')

const router = Router()


// route current
const PATH_ROUTER = `${__dirname}` 

// function to clear filename
const cleanFileName = (fileName) => {
    const file = fileName.split('.').shift()
    return file
}

const initialFunction = (archivos, cleanName) => {
    console.log('Route -> ...', cleanName)
    router.use(`/${cleanName}`, archivos.router)
}

// I use readdirSync to read all the files that are in my directory, and then import
// them and use my route, it saves me having to put a route.use('/fileName') for each
// file that exists in my routes folder
readdirSync(PATH_ROUTER).filter(fileName => {
    const cleanName = cleanFileName(fileName)
    if(cleanName !== 'index') {
      const archivos = require(`./${cleanName}.route`)
        initialFunction(archivos, cleanName)
        // router.use(`/${cleanName}`, archivos.router)
    }
    // else if(cleanName == "admin"){
    //     const validate = require("./validate-token.route")
    //     const admin = require("./admin.route")
    //     router.use("/admin", validate, admin)
    // }
    console.log(cleanName)
})


module.exports = router;