const {Router} = require("express");
const { getEventMeetAll } = require("../controllers/eventmeet.controller");
const router = Router();



router.get('/', async (req, res)=>{
    try {

        const getEvent = await getEventMeetAll()

        if(getEvent) res.status(200).json(getEvent)
        else throw new Error("No hay eventos actualmente")

    } catch (error) {
        res.status(500).json(error)
    }

})


module.exports = {router}