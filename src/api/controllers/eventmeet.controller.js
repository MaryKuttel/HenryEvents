const EventsMeet = require("../models/EventsMeet");

// ┌────────────────────────────┐
// │         RUTA POST          │
// └────────────────────────────┘


const postEventMeet = async (body) =>{
        const {title, description, date, user_event, people_asist, link, comment_meet} = body

       const newEventMeet = new EventsMeet({title,
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


const getEventMeetAll = async () =>{
    const eventmeet = await EventsMeet.find()

    return eventmeet
}

const getEventMeetID = async (id)=>{

}

module.exports = {
    postEventMeet,
    getEventMeetAll,
    getEventMeetID
}