const Response = require("../models/Response");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postResponse = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_meet} = body

       const newResponse = new Response({title,
        description,
        date,
        user_event,
        people_asist,
        link,
        comment_meet})

        await newResponse.save()


        return "New Response Created"

}


// ┌────────────────────────────┐
// │         RUTAS GET          │
// └────────────────────────────┘


const getResponseAll = async () =>{
    const Response = await EventsMeet.find()

    const mapEvent = Response.map(curr =>{
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date
        }
    })

    return mapEvent
}

const getResponseID = async (id)=>{
    if(id){
        const Response = await EventsMeet.findById(id)

        return Response
    }else{
        throw new Error("ID no ingresado, por favor corroborar")
    }
}

// ┌────────────────────────────┐
// │         RUTA DELETE        │
// └────────────────────────────┘


const deleteResponse = async (id) =>{

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


const updateResponse = async(id, body) =>{

    await EventsMeet.findByIdAndUpdate(id, body)
    
   return "Evento Actualizado Correctamente"

}


module.exports = {
    postResponse,
    getResponseAll,
    getResponseID,
    deleteResponse,
    updateResponse
}