const EventsMeet = require("../models/EventsMeet");
const User = require("../models/Users")

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postEventMeet = async (body) =>{
        const {title, description, date, user_event, link} = body

       const newEventMeet = new EventsMeet({title,
        description,
        date,
        user_event,
        link})

        await newEventMeet.save()


        return "New EventMeet Created"

}


// ┌────────────────────────────┐
// │         RUTAS GET          │
// └────────────────────────────┘


const getEventMeetAll = async () =>{
    const eventmeet = await EventsMeet.find()

    const mapEvent = await Promise.all(eventmeet.map(async curr =>{

        let user = await User.findById(curr.user_event)

        return {
            id: curr.id,
            title: curr.title,
            date: curr.date,
            type: curr.type,
            user_event: user.nickName
        }
    }))

    return mapEvent
}

const getEventMeetID = async (id)=>{
    if(id){
        const eventmeet = await EventsMeet.findById(id)

        return eventmeet
    }else{
        throw new Error("ID no ingresado, por favor corroborar")
    }
}

// ┌────────────────────────────┐
// │         RUTA DELETE        │
// └────────────────────────────┘


const deleteEventMeet = async (id) =>{

    if(id){

    const eliminadito = await EventsMeet.findByIdAndDelete(id)

    if(eliminadito) return "Evento eliminado correctamente"
    else throw new Error("Error al eliminar el evento, por favor corroborar ID")
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }

}

// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


const updateEventMeet = async(id, body) =>{

    await EventsMeet.findByIdAndUpdate(id, body)
    
   return "Evento Actualizado Correctamente"

}


// ┌────────────────────────────┐
// │         RUTA ARRAYS        │
// └────────────────────────────┘

// const arrCommMeets = async () =>{




// }



module.exports = {
    postEventMeet,
    getEventMeetAll,
    getEventMeetID,
    deleteEventMeet,
    updateEventMeet
}