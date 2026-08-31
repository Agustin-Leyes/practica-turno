const Usuario = require("../models/usuario.model");
const jwt = require("jsonwebtoken");
const { crearUsuarioDB, loginUsuarioDB } = require("../services/usuario.service");

const crearUsuario=async(req,res)=>{
    try{
    const {nombre,email,password}=req.body;

    let datosUsuario={nombre,email,password};

  /*   if(req.body.rol){
        datosUsuario.rol=req.body.rol;
    } */
    const usuarioCreado= await crearUsuarioDB(datosUsuario);

    if(!usuarioCreado.ok){
       return  res.status(400).send({mensaje:usuarioCreado.mensaje});
    }

    const { password:passwordEliminada, ...usuarioSinPassword } = usuarioCreado.nuevoUsuario.toJSON();
    return res.status(201).send(usuarioSinPassword);
    } catch(error){
            console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }

}


const loginUsuario=async(req,res)=>{
    const {email,password}=req.body;
    const usuarioLogin= await loginUsuarioDB(email,password);

    if(!usuarioLogin.ok){
        return res.status(401).json({mensaje:usuarioLogin.mensaje});
    }

    const usuario=usuarioLogin.usuario;

    const token=jwt.sign({id:usuario.id,rol:usuario.rol},
                process.env.JWT_SECRET,
                {expiresIn:"1h"});

    return res.status(200).send({mensaje:"Login exitoso",
        token,
        usuario:{id:usuario.id,nombre:usuario.nombre,rol:usuario.rol}
    });

}


module.exports={crearUsuario,loginUsuario};