const CommentsTalk = require("../models/CommentsTalk");
const Users = require("../models/Users");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postCommentTalk = async (body) =>{
        const {id_event_talk,comment, date, user_comment} = body

       const newCommentTalk = new CommentsTalk({id_event_talk, comment, date, user_comment})

        await newCommentTalk.save()


        return "New EventMeet Created"

}


// ┌────────────────────────────┐
// │         RUTAS GET          │
// └────────────────────────────┘


const getCommentTalkAll = async (id_event_talk) =>{
    const commentTalk = await CommentsTalk.find({id_event_talk: id_event_talk})

    const mapComment = commentTalk.map(async curr =>{

        let nameUser = await Users.findById(curr.user_comment).nickName

        console.log(nameUser)

        return {
            comment: curr.title,
            date: curr.date
        }
    })

    return mapComment
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