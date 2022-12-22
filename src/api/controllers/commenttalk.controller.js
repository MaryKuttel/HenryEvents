const CommentsTalk = require("../models/CommentsTalk");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postCommentTalk = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_meet} = body

       const newEventMeet = new CommentsTalk({title,
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


const getCommentTalkAll = async () =>{
    const eventmeet = await CommentsTalk.find()

    const mapEvent = eventmeet.map(curr =>{
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date
        }
    })

    return mapEvent
}

const getCommentTalkID = async (id)=>{
    if(id){
        const eventmeet = await CommentsTalk.findById(id)

        return eventmeet
    }else{
        throw new Error("ID no ingresado, por favor corroborar")
    }
}

// ┌────────────────────────────┐
// │         RUTA DELETE        │
// └────────────────────────────┘


const deleteCommentTalk = async (id) =>{

    if(id){

    const eliminadito = await CommentsTalk.findByIdAndDelete(id)

    if(eliminadito) return "Evento eliminado correctamente"
    else throw new Error("Error al eliminar el evento, por favor corroborar ID")
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }

}

// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


const updateCommentTalk = async(id, body) =>{

    await CommentsTalk.findByIdAndUpdate(id, body)
    
   return "Evento Actualizado Correctamente"

}


module.exports = {
    postCommentTalk,
    updateCommentTalk,
    getCommentTalkAll,
    getCommentTalkID,
    deleteCommentTalk
}