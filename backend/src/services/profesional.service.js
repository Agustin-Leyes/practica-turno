const Profesional = require("../models/profesional.models")

const crearProfesionalDB=async(datos,imagen)=>{

    const existe= await Profesional.findOne({where:{nombre:datos.nombre,especialidad:datos.especialidad}});

    if(existe){
        return {ok:false,mensaje:"ERROR.Ya existe un profesional con esos datos."};
    }

    const profesional= await Profesional.create({...datos,imagen});
    return {ok:true,
        profesional
    };
}

const obtenerProfesionalesDB=async(limit,offset)=>{
    return await Profesional.findAndCountAll({limit,offset})
}

const obtenerProfesionalIDDB=async(id)=>{
    return await Profesional.findByPk(id);
}

const modificarProfesionalDB=async(id,datos)=>{
    const profesional = await Profesional.findByPk(id);
    if(!profesional){
        return  {ok:false,
            mensaje:"No se encontro ningun profesional."
        }
    }
    
    await profesional.update(datos);

    return {ok:true,mensaje:"Se modifico el profesional",profesional};
}


const desactivarProfesionalDB=async(id)=>{
    const profesional = await Profesional.findByPk(id);

    if(!profesional){
        return {ok:false,mensaje:"No se encotro el profesional"};
    }

    await profesional.update({activo:false});

    return {ok:true,mensaje:"Profesional desactivado correctamente.",
        profesional
    }
}

module.exports={crearProfesionalDB,obtenerProfesionalesDB,obtenerProfesionalIDDB,modificarProfesionalDB,desactivarProfesionalDB};