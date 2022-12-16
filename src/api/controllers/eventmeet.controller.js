const EventsMeet = require("../models/EventsMeet");

// ┌────────────────────────────┐
// │         RUTA POST         │
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

        console.log(newEventMeet)

        return "New EventMeet Created"

}

module.exports = {
    postEventMeet
}