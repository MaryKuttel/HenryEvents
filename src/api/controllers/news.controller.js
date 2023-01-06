const EventsTalk = require("../models/EventsTalk");
const EventsMeet = require("../models/EventsMeet");
const User = require("../models/Users")

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postNew = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comments, type} = body

        if(type === "meeting"){
       
            const newNew = new EventsMeet({title,
                description,
                date,
                user_event,
                people_assist,
                link,
                comments})
            
            await newNew.save()


            return "New Meeting Created"

    }else if(type === "talk"){
        
        const newNew = new EventsTalk({title,
            description,
            date,
            user_event,
            people_assist,
            link,
            comments})

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
    
    const mapEvent = await Promise.all(allOfThem.map(async curr =>{

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

} else if(meetings){

    const mapMeet = await Promise.all(meetings.map(async curr =>{

        let user = await User.findById(curr.user_event)

        return {
            id: curr.id,
            title: curr.title,
            date: curr.date,
            type: curr.type,
            user_event: curr.user_event
        }
    })) 

    const ordenados = mapMeet.sort((x, y) => y.date - x.date)

    return ordenados

}else if(talks){

    const mapTalk = await Promise.all(talks.map(async curr =>{
        
        let user = await User.findById(curr.user_event)
        
        return {
            id: curr.id,
            title: curr.title,
            date: curr.date,
            type: curr.type,
            user_event: curr.user_event
        }
    })) 

    const ordenados = mapTalk.sort((x, y) => y.date - x.date)

    return ordenados

}else{
    return "No hay Eventos"
}
    

    
}

const getNewID = async (id, type)=>{
    
    if(id && type){

        if(type === "meeting"){
            
            const meet = await EventsMeet.findById(id)
                .populate({path: "comments"})
                
                const user = await User.findById(meet.user_event)

                const author = {
                    idUser: meet.user_event,
                    nickName: user.nickName,
                    image: user.image
                }

             const newmeet = await Promise.all(meet.comments.map(async curr =>{

                let usuario = await User.findById(curr.user_comment)

                return{
                    _id: curr._id,
                    user_comment: usuario.nickName,
                    comment: curr.comment,
                    id_event_meet: curr.id_event_meet,
                    date: curr.date
                }

             }))

             const people = await Promise.all(meet.people_assist.map(async curr =>{

                let assist = await User.findById(curr)

                return{
                    idUser: assist._id,
                    nickName: assist.nickName,
                    image: assist.image
                }

             }))

             const newObject = {
                title: meet.title,
                date: meet.date,
                user_event: author,
                description:meet.description,
                people_assist: people,
                link:meet.link,
                comments: newmeet,
                type: meet.type
        
             }

            
            if(meet === null){
                
                return "ID no correspondiente al Tipo de Evento entregado. Por favor revisar."
            
            }else{
                return newObject
            }

        } else if(type === "talk"){
            
            const talk = await EventsTalk.findById(id)
                            .populate({path: "comments"})
                
                const user = await User.findById(talk.user_event)

                const author = {
                    idUser: talk.user_event,
                    nickName: user.nickName,
                    image: user.image
                }

             const newtalk = await Promise.all(talk.comments.map(async curr =>{

                let usuario = await User.findById(curr.user_comment)

                return{
                    _id: curr._id,
                    user_comment: usuario.nickName,
                    comment: curr.comment,
                    id_event_talk: curr.id_event_talk,
                    date: curr.date
                }

             }))

             const people = await Promise.all(talk.people_assist.map(async curr =>{

                let assist = await User.findById(curr)

                return{
                    idUser: assist._id,
                    nickName: assist.nickName,
                    image: assist.image
                }

             }))

             const newObject = {
                title: talk.title,
                date: talk.date,
                user_event: author,
                description:talk.description,
                people_assist: people,
                link:talk.link,
                comments: newtalk,
                type: talk.type
        
             }
            
            if(talk === null){
                
                return "ID no correspondiente al Tipo de Evento entregado. Por favor revisar."
            
            }else{
                return newObject
            }

        }else{
            return "Tipo inválido. Por favor revisar. Operación cancelada"
        }
        
    }else{
        throw new Error("ID o Tipo no ingresado, por favor corroborar")
    }
}

// ┌────────────────────────────┐
// │         RUTA DELETE        │
// └────────────────────────────┘


const deleteNew = async (id, type) =>{

    if(id && type){
        if(type === "meeting"){
            
            const eliminadito = await EventsMeet.findByIdAndDelete(id)

            console.log("Delete en tipo meeting",eliminadito)

            if(eliminadito === null) return "Error al eliminar el evento, por favor corroborar ID"
            else return "Evento eliminado correctamente"

        }else if(type === "talk"){

            const eliminadito = await EventsTalk.findByIdAndDelete(id)

            console.log("Delete en tipo talk", eliminadito)

            if(eliminadito === null) return "Error al eliminar el evento, por favor corroborar ID"
            else return "Evento eliminado correctamente"


    } else{

            return "Tipo de Evento incorrecto. Por favor revisar"
            
        }
    
    }else{
        throw new Error("ID no recibido, por favor corroborar")
    }

}

// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


const updateNew = async(id, body) =>{

    const type = body.type

    if(type === "meeting"){

        let actualizado = await EventsMeet.findByIdAndUpdate(id, body)
        if(actualizado === null){

            return "Tipo de Evento no correspondiente con el ID mandado, por favor revisar."

        }else{
                
            return "Evento Actualizado Correctamente"
        
        }

    }else if(type === "talk"){

       let actualizado = await EventsTalk.findByIdAndUpdate(id, body)

        if(actualizado === null){

            return "Tipo de Evento no correspondiente con el ID mandado, por favor revisar."

        }else{
                
            return "Evento Actualizado Correctamente"
        
        }

        

    }else{
        return "Tipo de Evento no existente. Por favor revisar."
    }

}



const cargarFavoritos = async (id_user, id_event, type)=>{

    if(type === "meeting"){

        const actualizarFavs = await User.findByIdAndUpdate(id_user,
            {
                $push:{
                    fav_events_meet: id_event
                }         

        },{new: true}
        )

        if(actualizarFavs) return "Evento añadido a favoritos correctamente"

    }else if(type === "talk"){

        const actualizarFavs = await User.findByIdAndUpdate(id_user,
            {
                $push:{
                    fav_events_talk: id_event
                }         

        },{new: true}
        )

        if(actualizarFavs) return "Evento añadido a favoritos correctamente"

    }else{
       return "Error en el tipo de evento, revisar."
    }


}

const peopleAsist = async (id_user, id_event, type)=>{


    if(type === "meeting"){


        const actualizarGente = await EventsMeet.findByIdAndUpdate(id_event,
            {
                $push:{
                    people_assist: id_user
                }         

        },{new: true}
        )

        if(actualizarGente) return "Usuario añadido a asistencia correctamente"

    }else if(type === "talk"){

        const actualizarGente = await EventsTalk.findByIdAndUpdate(id_event,
            {
                $push:{
                    people_assist: id_user
                }         

        },{new: true}
        )
        if(actualizarGente) return "Usuario añadido a asistencia correctamente"

    }else{
       return "Error en el tipo de evento, revisar."
    }


}


module.exports = {
    postNew,
    getNewAll,
    getNewID,
    deleteNew,
    updateNew,
    cargarFavoritos,
    peopleAsist
}