const CommentsMeet = require("../models/CommentsMeet");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postCommentMeet = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_meet} = body

       const newEventMeet = new CommentsMeet({title,
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


const getCommentMeetAll = async () =>{
    const eventmeet = await CommentsMeet.find()

    const mapEvent = eventmeet.map(curr =>{
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date
        }
    })

    return mapEvent
}

const getCommentMeetID = async (id)=>{
    if(id){
        const eventmeet = await CommentsMeet.findById(id)

        return eventmeet
    }else{
        throw new Error("ID no ingresado, por favor corroborar")
    }
}

// ┌────────────────────────────┐
// │         RUTA DELETE        │
// └────────────────────────────┘


const deleteCommentMeet = async (id) =>{

    if(id){

    const eliminadito = await CommentsMeet.findByIdAndDelete(id)

    if(eliminadito) return "Evento eliminado correctamente"
    else throw new Error("Error al eliminar el evento, por favor corroborar ID")
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }

}

// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


const updateCommentMeet = async(id, body) =>{

    await CommentsMeet.findByIdAndUpdate(id, body)
    
   return "Evento Actualizado Correctamente"

}


module.exports = {
    postCommentMeet,
    getCommentMeetAll,
    getCommentMeetID,
    updateCommentMeet,
    deleteCommentMeet
}