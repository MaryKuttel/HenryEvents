const EventsMeet = require("../models/EventsMeet");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postEventMeet = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_meet} = body

       const newEventMeet = new EventsMeet({title,
        description,
        date,
        user_event,
        people_asist,
        link,
        comment_meet})

        await newEventMeet.save()


        return "New EventMeet Created"

}


// ┌────────────────────────────┐
// │         RUTAS GET          │
// └────────────────────────────┘


const getEventMeetAll = async () =>{
    const eventmeet = await EventsMeet.find()

    return eventmeet
}

const getEventMeetID = async (id)=>{
    if(id){
        const eventmeet = await EventsMeet.findById(id)

        return eventmeet
    }else{
        throw new Error("ID no ingresado, por favor corroborar")
    }
}

const deleteEventMeet = async (id) =>{

    if(id){

    const eliminadito = await EventsMeet.findByIdAndDelete(id)

    if(eliminadito) return "Evento eliminado correctamente"
    else throw new Error("Error al eliminar el evento, por favor corroborar ID")
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }
    


}


module.exports = {
    postEventMeet,
    getEventMeetAll,
    getEventMeetID,
    deleteEventMeet
}