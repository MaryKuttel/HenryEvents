
const {Router} = require("express");

const {getNames, postEventMeet} = require("../controllers/eventmeet.controller")


const router = Router();


router.get('/', (req, res)=>{
    try {
        res.status(200).json("holis. ¿va?")
    } catch (error) {
        
    }

})


router.post("/", async (req, res)=>{
    try {
        const {title, description} = req.body

        if(!title || !description){
            res.status(409).json("Falta información requerida, por favor revisar")
        }else{
            res.status(200).json(await postEventMeet(req.body))
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {router}