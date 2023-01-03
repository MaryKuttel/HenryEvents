const EventsTalk = require("../models/EventsTalk");
const EventsMeet = require("../models/EventMeet");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postNew = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_meet, type} = body

       const newNew = new News({title,
        description,
        date,
        user_event,
        people_asist,
        link,
        comment_meet})

        await newNew.save()


        return "New News Created"

}


// ┌────────────────────────────┐
// │         RUTAS GET          │
// └────────────────────────────┘


const getNewAll = async () =>{

    const meetings = EventsMeet.find()
    const talks = EventsTalk.find()

    const mapEvent = meetings.map(curr =>{
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date
        }
    })

    return mapEvent
}

const getNewID = async (id)=>{
    if(id){
        const New = await News.findById(id)

        return New
    }else{
        throw new Error("ID no ingresado, por favor corroborar")
    }
}

// ┌────────────────────────────┐
// │         RUTA DELETE        │
// └────────────────────────────┘


const deleteNew = async (id) =>{

    if(id){

    const eliminadito = await News.findByIdAndDelete(id)

    if(eliminadito) return "Evento eliminado correctamente"
    else throw new Error("Error al eliminar el evento, por favor corroborar ID")
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }

}

// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


const updateNew = async(id, body) =>{

    await News.findByIdAndUpdate(id, body)
    
   return "Evento Actualizado Correctamente"

}


module.exports = {
    postNew,
    getNewAll,
    getNewID,
    deleteNew,
    updateNew
}