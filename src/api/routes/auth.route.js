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

    // const token = jwt.sign({
    //     nickName: userfind.nickName,
    //     id: userfind._id
    // }, process.env.TOKEN_SECRETO)


    res.status(200).json({ nickName: userfind.nickName, _id: userfind._id, fav_events_meet: userfind.fav_events_meet, fav_events_talk: userfind.fav_events_talk, darkMode: userfind.darkMode, admin: userfind.admin})

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
        
        // configuracion de email

         /* const transport = nodemailer.createTransport({
             service: "Gmail",
             auth: {
                 user: process.env.user,
                 pass: process.env.pass,
          },
         });

         let msg = await transport.sendMail({
             to: email,
            subject: "Please confirm your account",
             html: `<h1>Email Confirmation</h1>
                 <h2>Hello ${user.nickName}</h2>
                 <p>Thank you for register. Please confirm your email by clicking on the following link</p>
                 <a href="https://backend-gamematch.herokuapp.com/users/confirm/${user._id}"> Click here</a>
                 </div>`,
     }); */
        if(userDB)  res.json(userDB)
        else throw new Error("Usuario ya creado. Logeate!");

        
    } catch (error) {
        res.status(400).json(error)
    }

})



router.get("/", async (req, res)=>{

    try {
       
        const users = await User.find()
        if(users) res.status(200).json(users)
        else res.status(404).json("No se encontraron usuarios")
    
    } catch (error) {
        
        res.status(400).json(error)

    }
    

})

router.get("/:id", async (req, res)=>{

    try {

        const id = req.params.id

        const user = await User.findById(id)

        if(user) res.status(200).json(user)
        else res.status(404).json("No se encontraro el usuario")

        
    } catch (error) {

        res.status(400).json(error)
        
    }

})



router.post("/favoritos", async (req, res)=>{

    try {

        let {id_user, id_event, type} = req.body

        
        
    } catch (error) {
        res.status(400).json(error)
    }

})

module.exports = {router}