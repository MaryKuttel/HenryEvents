import { Router } from 'express'

import { readdirSync } from 'fs'

const router = Router()

// route current
const PATH_ROUTER = `${__dirname}` 

// function to clear filename
const cleanFileName = (fileName) => {
    const file = fileName.split('.').shift()
    return file
}


// I use readdirSync to read all the files that are in my directory, and then import
// them and use my route, it saves me having to put a route.use('/fileName') for each
// file that exists in my routes folder
readdirSync(PATH_ROUTER).filter(fileName => {
    const cleanName = cleanFileName(fileName)
    if(cleanName !== 'index') {
        import(`./${cleanName}.routes`).then(modelRouter => {
            console.log('Route -> ...', cleanName)
            router.use(`/${cleanName}`, modelRouter.router)
        })
    }
})


export default router;