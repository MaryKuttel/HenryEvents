const {Router} = require("express");
const { getEventTalkAll } = require("../controllers/eventtalk.controller");
const router = Router();


router.get('/', async (req, res)=>{
    try {

        const getEvent = await getEventTalkAll()

        if(getEvent) res.status(200).json(getEvent)
        else throw new Error("No hay eventos actualmente")

    } catch (error) {
        res.status(500).json(error)
    }

})


module.exports = {router}