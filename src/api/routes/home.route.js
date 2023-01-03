
const {Router} = require("express");

const {postNew, getNewAll, deleteNew, updateNew, getNewID} = require("../controllers/news.controller")


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

router.get("/:id", async (req, res)=>{
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
        const {title, description, type} = req.body

        if(!title || !description || !type){
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

module.exports = {router}