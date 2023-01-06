
const {Router} = require("express");

const {postNew, getNewAll, deleteNew, updateNew, getNewID, peopleAsist} = require("../controllers/news.controller")


const router = Router();


router.get('/', async (req, res)=>{
    try {

        const getEvent = await getNewAll()

        if(getEvent) res.status(200).json(getEvent)
        else throw new Error("No hay eventos actualmente")

    } catch (error) {
        res.status(500).json(error)
    }

})

router.post("/:id", async (req, res)=>{
    try {

        const id = req.params.id
        const type = req.body.type
        
        if(id && type){

            const getEventID = await getNewID(id, type)
            if(getEventID) res.status(200).json(getEventID)
            else throw new Error("ID no válido, por favor revisar")

        }else{
            res.status(409).json("ID o Tipo de Evento no ingresado.")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post("/", async (req, res)=>{
    try {
        const {title, description, type, user_event} = req.body

        if(!title || !description || !type || !user_event){
            res.status(409).json("Falta información requerida, por favor revisar")
        }else{
            res.status(200).json(await postNew(req.body))
        }

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async (req, res)=>{
    try {
        const id = req.params.id
        const type= req.body.type

        const eliminado = await deleteNew(id, type)

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
            const updated = await updateNew(id, data)
            res.status(200).json(updated)
        }else{
            res.status(409).json("ID o Datos no encontrado.")
        }


    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id/people", async (req, res)=>{

    try {

        let id_event = req.params.id
        let {id_user, type} = req.body

        if(!id_user || !type || !id_event){
            res.status(409).json("Falta información requerida")

        }else{
            
            const asist = await peopleAsist(id_user, id_event, type)
    
            if(asist) res.status(200).json(asist)
            else res.status(400).json("Error en la función")
        }


        
    } catch (error) {
        res.status(400).json(error)
    }

})

module.exports = {router}