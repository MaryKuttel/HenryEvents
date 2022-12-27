const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next)=>{
    
    const token = req.header("auth-token");

    if(!token){
        return res.status(401).json({error: "Acceso Denegado"})
    }

    try {

        const verified = jwt.verify(token, process.env.TOKEN_SECRETO)
        req.user = verified

        next()
        
    } catch (error) {

        res.status(400).json({error: "Token inválido"})
        
    }

}

module.exports = verifyToken