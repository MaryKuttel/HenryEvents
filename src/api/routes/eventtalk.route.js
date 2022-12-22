
const {Router} = require("express");

const {postEventMeet, getEventMeetAll, deleteEventMeet, updateEventMeet, getEventMeetID} = require("../controllers/eventmeet.controller")


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
        if(id){

            const getEventID = getEventMeetID(id)
            if(getEventID) res.status(200).json(getEventID)
            else throw new Error("ID no válido, por favor revisar")

        }else{
            res.status(409).json("ID no ingresado.")
        }
        
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

router.delete("/:id", async (req, res)=>{
    try {
        const id = req.params.id

        const eliminado = await deleteEventMeet(id)

        res.status(200).json(eliminado)

    } catch (error) {
        res.status(500).json(error)
    }
} )


router.put("/:id", async (req, res)=>{
    try {
        
        const id = req.params.id
        const data = req.body

        if(id && data){
            const updated = await updateEventMeet(id, data)
            res.status(200).json(updated)
        }else{
            res.status(409).json("ID o Datos no encontrado.")
        }


    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {router}