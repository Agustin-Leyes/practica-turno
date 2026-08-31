const { Op } = require("sequelize");
const Horario = require("../models/horario.models");
const Profesional = require("../models/profesional.models");

const obtenerHorariosProfesionalDB=async(profesionalId)=>{
    return await Horario.findAll({
        where:{
            profesionalId
        }
    });
};


const crearHorarioDB = async (profesionalId,datos)=>{
    const profesional = await Profesional.findByPk(profesionalId);

    if(!profesional){
        return {ok:false,mensaje:"No existe el profesional"};
    }

    const horarioExistente = await Horario.findOne({where : {profesionalId:profesionalId,dia:datos.dia , horaInicio:{[Op.lt]:datos.horaFin},horaFin:{[Op.gt]:datos.horaInicio}}})

    if(horarioExistente){
         return {ok:false,mensaje:"El profesional ya tiene un horario que se superpone con ese horario."};
    }

    const horario = await Horario.create({profesionalId,...datos});

    return {ok:true, horario};
}


const modificarHorarioDB= async (id,datos)=>{
    const horario = await Horario.findByPk(id);

    if(!horario){
         return {
            ok: false,
            mensaje: "No se encontró el horario."
        };
    }

    const horarioExistente = await Horario.findOne({
        where:{
            id:{[Op.ne]:id},
        
        profesionalId:horario.profesionalId,
        dia: datos.dia ?? horario.dia,
    
        horaInicio:{[Op.lt]:datos.horaFin ?? horario.horaFin},
        horaFin:{[Op.gt]:datos.horaInicio ?? horario.horaInicio}}})

        if(horarioExistente){
            return {ok:false,mensaje:"El nuevo horario se superpone con otro horario existente."}
        }


    await horario.update(datos);
     return {
        ok: true,
        mensaje: "Horario modificado correctamente.",
        horario
    };
}




const bajaLogicaHorarioDB = async (id)=>{
    const horario = await Horario.findByPk(id);

    if(!horario){
        return {ok:false,mensaje:"No existe el horario deseado a bajar."};
    }

    await horario.update({
        activo:false,
    });

    return {ok:true,mensaje:"Horario desactivado correctamente"};
}

module.exports={obtenerHorariosProfesionalDB,crearHorarioDB,modificarHorarioDB,bajaLogicaHorarioDB};