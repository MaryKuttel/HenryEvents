const CommentsNews = require("../models/CommentsNews");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postCommentNew = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_meet} = body

       const newEventMeet = new CommentsNews({title,
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


const getCommentNewAll = async () =>{
    const eventmeet = await CommentsNews.find()

    const mapEvent = eventmeet.map(curr =>{
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date
        }
    })

    return mapEvent
}

const getECommentNewID = async (id)=>{
    if(id){
        const eventmeet = await CommentsNews.findById(id)

        return eventmeet
    }else{
        throw new Error("ID no ingresado, por favor corroborar")
    }
}

// ┌────────────────────────────┐
// │         RUTA DELETE        │
// └────────────────────────────┘


const deleteCommentNew = async (id) =>{

    if(id){

    const eliminadito = await CommentsNews.findByIdAndDelete(id)

    if(eliminadito) return "Evento eliminado correctamente"
    else throw new Error("Error al eliminar el evento, por favor corroborar ID")
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }

}

// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


const updateCommentNew = async(id, body) =>{

    await CommentsNews.findByIdAndUpdate(id, body)
    
   return "Evento Actualizado Correctamente"

}


module.exports = {
    postCommentNew,
    getCommentNewAll,
    getCommentNewID,
    deleteCommentNew,
    updateCommentNew
}