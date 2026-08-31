const Usuario = require("../models/usuario.model")
const bcrypt=require("bcrypt");

const crearUsuarioDB=async(usuario)=>{
    const usuarioExistente = await Usuario.findOne({where:{email:usuario.email}});

    if(usuarioExistente){
        return {ok:false,mensaje:"Ya existe este usuario"};
    }
    const complejidad=12;
    const sal=await bcrypt.genSalt(complejidad,"b");
    const passwordHash= await bcrypt.hash(usuario.password,sal);
    const nuevoUsuario= await Usuario.create({...usuario,password:passwordHash});
    return {ok:true,nuevoUsuario};
}

const loginUsuarioDB=async(email,password)=>{
    const usuario= await Usuario.findOne({where:{email}})

    if(!usuario){
        return {ok:false,mensaje:"Email o contraseña incorrectos."}
    }

    const passwordCorrecta= await bcrypt.compare(password,usuario.password);

    if(!passwordCorrecta){
        return {ok:false,mensaje:"Email o contraseña incorrectos."};
    }

    return { ok:true ,usuario};
}

module.exports={crearUsuarioDB,loginUsuarioDB};