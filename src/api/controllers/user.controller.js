const Users = require("../models/Users")



// ┌────────────────────────────┐
// │         RUTA UPDATE        │
// └────────────────────────────┘


const updateUser = async(id, body) =>{

    await Users.findByIdAndUpdate(id, body)
    
   return "Evento Actualizado Correctamente"

}

module.exports = {
    updateUser
}
