
const {Router} = require("express");

const {getNames, postEventMeet, getEventMeetAll} = require("../controllers/eventmeet.controller")


const router = Router();


router.get('/', async (req, res)=>{
    try {

        const getEvent = await getEventMeetAll()

        if(getEvent) res.status(200).json(getEvent)
        else throw new Error("No hay eventos del tipo Meet")

    } catch (error) {
        res.status(500).json(error)
    }

})

router.get("/:id", async (req, res)=>{
    try {

        const id = req.params.id
        
    } catch (error) {
        res.status(500).json(error)
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