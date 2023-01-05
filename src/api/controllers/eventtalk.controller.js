const EventsTalk = require("../models/EventsTalk");
const User = require("../models/Users")

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postEventTalk = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_Talk} = body

       const newEventTalk = new EventsTalk({title,
        description,
        date,
        user_event,
        people_asist,
        link,
        comment_Talk})

        await newEventTalk.save()


        return "New EventTalk Created"

}


// ┌────────────────────────────┐
// │         RUTAS GET          │
// └────────────────────────────┘


const getEventTalkAll = async () =>{
    const eventTalk = await EventsTalk.find()

    const mapEvent = await Promise.all(eventTalk.map(async curr =>{
        
        let user = await User.findById(curr.user_event)
        
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date,
            type: curr.type,
            user_event: user.nickName
        }
    }))

    const ordenados = mapEvent.sort((x, y) => y.date - x.date)

    return ordenados
}

const getEventTalkID = async (id)=>{
    if(id){
        const eventTalk = await EventsTalk.findById(id)

        return eventTalk
    }else{
        throw new Error("ID no ingresado, por favor corroborar")
    }
}

// ┌────────────────────────────┐
// │         RUTA DELETE        │
// └────────────────────────────┘


const deleteEventTalk = async (id) =>{

    if(id){

    const eliminadito = await EventsTalk.findByIdAndDelete(id)

    if(eliminadito) return "Evento eliminado correctamente"
    else throw new Error("Error al eliminar el evento, por favor corroborar ID")
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }

}

// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


const updateEventTalk = async(id, body) =>{

    await EventsTalk.findByIdAndUpdate(id, body)
    
   return "Evento Actualizado Correctamente"

}


module.exports = {
    postEventTalk,
    getEventTalkAll,
    getEventTalkID,
    deleteEventTalk,
    updateEventTalk
}