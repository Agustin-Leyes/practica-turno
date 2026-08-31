const jwt = require("jsonwebtoken");


const verificarToken=(req,res,next)=>{
    try{
        const authHeader =req.headers.authorization;
        if(!authHeader){
              return res.status(401).json({
                mensaje: "Token no proporcionado"
            });
        }

        const token=authHeader.split(" ")[1];

        if(!token){
             return res.status(401).json({
                mensaje: "Token no proporcionado"
            });
        }

        const datousuario=jwt.verify(token,process.env.JWT_SECRET);
        req.usuario=datousuario;
        next();
    }catch(error){
        console.error(error);
        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        });
    }
}


module.exports=verificarToken;