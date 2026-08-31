const {Router}=require("express");
const { crearUsuario, loginUsuario } = require("../controller/usuario.controller");
const verificarToken = require("../middlewares/verificarToken");


const authRouter=Router();


authRouter.post("/registro",crearUsuario);
authRouter.post("/login",loginUsuario);

authRouter.get("/prueba-token", verificarToken, (req, res) => {
    res.json({
        mensaje: "Token válido",
        usuario: req.usuario
    });
});

module.exports=authRouter;