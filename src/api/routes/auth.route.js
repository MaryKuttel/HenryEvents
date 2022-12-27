const {Router} = require("express");
const User = require("../models/Users")

const router = Router();

const Joi = require("@hapi/joi")
const schemaRegister = Joi.object({
    nickName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post("/register", async (req, res) =>{

    //validación de usuario

    const {error} = schemaRegister.validate(req.body)

    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }


    const user = new User({
        nickName: req.body.nickName,
        email: req.body.email,
        password: req.body.password
    })

    try {

        const userDB = await user.save()

        res.json({
            data: userDB
        })

        
    } catch (error) {
        res.status(400).json(error)
    }

})



module.exports = {router}