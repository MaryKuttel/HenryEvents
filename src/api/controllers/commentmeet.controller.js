const CommentsMeet = require("../models/CommentsMeet");
const Users = require("../models/Users");
const EventsMeet = require("../models/EventsMeet")

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postCommentMeet = async (body) =>{
        const {id_event_meet,comment, date, user_comment} = body

       const newCommentMeet = new CommentsMeet({id_event_meet, comment, date, user_comment})

        await newCommentMeet.save()

        const actualizareveto = await EventsMeet.findByIdAndUpdate(id_event_meet,
            {
                $push:{
                    comment_meet: newCommentMeet._id
                }         

        },{new: true}
        )


        return "New CommentMeet Created"

}


// ┌────────────────────────────┐
// │         RUTAS GET          │
// └────────────────────────────┘


const getCommentMeetAll = async (id_event_meet) =>{

    if(id_event_meet){

    const commentMeet = await CommentsMeet.find({id_event_meet: id_event_meet})

    
    const mapComment = Promise.all(commentMeet.map(async curr =>{

        let nameUser = await Users.findById(curr.user_comment)

        return {
            comment: curr.comment,
            date: curr.date,
            user_comment: nameUser.nickName
        }
    }))

    return mapComment

}else{
    throw new Error("No se ha encontrado el ID del Evento. No se podrán mostrar los comentarios")
}
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

    if(eliminadito) return "Comentario eliminado correctamente"
    else throw new Error("Error al eliminar el Comentario, por favor corroborar ID")
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }

}

// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


// const updateCommentMeet = async(id, body) =>{

//     await CommentsMeet.findByIdAndUpdate(id, body)
    
//    return "Evento Actualizado Correctamente"

// }


module.exports = {
    postCommentMeet,
    // updateCommentMeet,
    getCommentMeetAll,
    getCommentMeetID,
    deleteCommentMeet
}