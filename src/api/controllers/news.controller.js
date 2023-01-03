const EventsTalk = require("../models/EventsTalk");
const EventsMeet = require("../models/EventsMeet");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postNew = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_meet, type} = body

        if(type === "meeting"){
       
            const newNew = new EventsMeet({title,
                description,
                date,
                user_event,
                people_asist,
                link,
                comment_meet})
            
            await newNew.save()


            return "New Meeting Created"

    }else if(type === "talk"){
        
        const newNew = new EventsTalk({title,
            description,
            date,
            user_event,
            people_asist,
            link,
            comment_meet})

            await newNew.save()


            return "New Talk Created"


    } else{
        return "Categoría de evento no aceptada. Por favor revisar. Acción Cancelada."
    }

       

}


// ┌────────────────────────────┐
// │         RUTAS GET          │
// └────────────────────────────┘


const getNewAll = async () =>{

    const meetings = await EventsMeet.find()
    const talks = await EventsTalk.find()

    if(meetings && talks){

    const allOfThem = (meetings).concat(talks)
    
    const mapEvent = allOfThem.map(curr =>{
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date,
            type: curr.type
        }
    }) 

    const ordenados = mapEvent.sort((x, y) => x.date - y.date)

    return ordenados

} else if(meetings){

    const mapMeet = meetings.map(curr =>{
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date,
            type: curr.type
        }
    }) 

    const ordenados = mapMeet.sort((x, y) => x.date - y.date)

    return ordenados

}else if(talks){

    const mapTalk = talks.map(curr =>{
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date,
            type: curr.type
        }
    }) 

    const ordenados = mapTalk.sort((x, y) => x.date - y.date)

    return ordenados

}
    

    
}

const getNewID = async (id, type)=>{
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