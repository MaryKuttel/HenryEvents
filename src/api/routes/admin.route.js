const {Router} = require("express");

const router = Router();

router.get("/", async (req, res)=>{
    
    res.json({
        error: null,
        data:{
            mesagge: "Ruta admin (protegida)",
            user: req.user
        }
    })
})


module.exports = {router}