const esAdmin=(req,res,next)=>{
    if(req.usuario.rol!=="admin"){
        return res.status(403).json({
            mensaje:"No tiene permisos de administrador."
        });
    }
    next();
}

module.exports=esAdmin;