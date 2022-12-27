const {Router} = require("express");
const User = require("../models/Users")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const router = Router();

const Joi = require("@hapi/joi")


const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})


const schemaRegister = Joi.object({
    nickName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})


router.post("/login", async (req, res)=>{
    
    //validaciones para login

    const {error} = schemaLogin.validate(req.body)

    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const userfind = await User.findOne({email: req.body.email})

    if(!userfind){
        return res.status(400).json({error: "Usuario no encontrado"})
    }

    const validatePass = await bcrypt.compare(req.body.password, userfind.password)
    
    if(!validatePass){
        return res.status.json({error: "Contraseña incorrecta"})
    }


    // create token

    const token = jwt.sign({
        nickName: userfind.nickName,
        id: userfind._id
    }, process.env.TOKEN_SECRETO)


    res.header("auth-token", token).json({mensaje: "Bienvenido!", token: token})

})


router.post("/register", async (req, res) =>{

    //validación de usuario

    const {error} = schemaRegister.validate(req.body)

    if(error){
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    const emailOn = await User.findOne({email: req.body.email})
    if(emailOn){
        return res.status(400).json({error: "El email ya existe"})
    }

    //Encriptando contraseña

    const vueltasEncript = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, vueltasEncript)

    const user = new User({
        nickName: req.body.nickName,
        email: req.body.email,
        password: password
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