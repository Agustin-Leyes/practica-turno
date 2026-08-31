const Profesional = require("../models/profesional.models");
const Horario = require("../models/horario.models");
const Turno = require("../models/turno.model");
const { Op } = require("sequelize");
const Usuario = require("../models/usuario.model");
const crearTurnoDB = async (pacienteId,datos)=>{
    const profesional = await Profesional.findByPk(datos.profesionalId);

    if(!profesional){
        return {ok:false,mensaje:"No se encontro el profesional"};
    }

    const horario = await Horario.findOne({where:{
        id:datos.horarioId,
        profesionalId:datos.profesionalId
    }})

   
    if (!horario) {
        return {
            ok: false,
            mensaje: "El horario no pertenece a ese profesional o no existe."
        };
    }

console.log("HORARIO ENCONTRADO:", horario);
    if(!horario.activo){
        return {ok:false,mensaje:"El horario no esta disponible"};
    }

    const diasSemana = [
    "domingo",
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado"
    ];
    const fecha = new Date(`${datos.fecha}T00:00:00`);

    const diaFecha= diasSemana[fecha.getDay()];

    if(diaFecha !== horario.dia){
             return {
        ok: false,
        mensaje: `La fecha seleccionada no corresponde al día ${horario.dia}.`
    };
    }


    const hoy=new Date();
    hoy.setHours(0,0,0,0);

    if(fecha<hoy){
        return {ok : false , mensaje : "No se puede crear un turno para una fecha pasada"}
    }

    const turnoExistente = await Turno.findOne({
        where:{
            horarioId:datos.horarioId,
            fecha:datos.fecha,
            estado:{
                [Op.ne]:"cancelado",
            },
        }
    })
    
    if(turnoExistente){
        return {ok:false,mensaje:"Este turno ya existe."}
    }


    const turno = await Turno.create({pacienteId,profesionalId:datos.profesionalId,horarioId:datos.horarioId,fecha:datos.fecha,observaciones:datos.observaciones});

    return {ok:true,mensaje:"Turno creado correctamente",turno};
}




const obtenerTurnosDB = async (id,rol)=>{



  /*   const turnos = await Turno.findAll({
    attributes: [
        "id",
        "fecha",
        "estado"
    ],

    include: [
        {
            model: Usuario,
            attributes: [
                "id",
                "nombre"
            ]
        },
        {
            model: Profesional,
            attributes: [
                "id",
                "nombre",
                "especialidad"
            ]
        },
        {
            model: Horario,
            attributes: [
                "dia",
                "horaInicio",
                "horaFin"
            ]
        }
    ]
}); */

    const where={};
    if(rol === "paciente"){
        where.pacienteId=id;
    }
    const turnos= await Turno.findAll({where,
        include:[{model:Usuario,attributes:["id","nombre","email"]},Profesional,Horario]
    });

    return {ok:true,turnos,}
}


const cancelarTurnoDB= async(id,usuarioId,rol)=>{
    const turno= await Turno.findByPk(id);

    if(!turno){
        return {ok:false,
            mensaje:"No se encontro ningun turno."
        }
    }

    if(rol==="paciente" && turno.pacienteId !== usuarioId){
          return {
            ok: false,
            mensaje: "No podés cancelar un turno que no te pertenece."
        };
    }


    if(turno.estado === "cancelado"){
        return {
            ok: false,
            mensaje: "El turno ya está cancelado."
        };
    }

    turno.estado="cancelado";

    await turno.save();
    return{ok:true,mensaje:"Turno modificado correctamente.",turno};
}


const modificarTurnoDB = async (id,usuarioId,rol,datos)=>{
    const turno = await Turno.findByPk(id);

    if(!turno){
        return { ok:false,
            mensaje:"No se encontro el turno"
        };
    };

    if( rol === "paciente"  && turno.pacienteId != usuarioId){
        return {ok:false,mensaje:"No podes modificar un turno que no te pertenece."};
    };

    if(turno.estado==="cancelado"){
        return {ok:false,mensaje:"No se puede modificar un turno cancelado"};
    };


    const nuevoHorarioId=datos.horarioId ?? turno.horarioId;
    const nuevaFecha = datos.fecha ?? turno.fecha;
 console.log("turno.fecha:", turno.fecha);
console.log("datos:", datos);
console.log("nuevoHorarioId:", nuevoHorarioId);
console.log("nuevaFecha:", nuevaFecha);
    const horario = await Horario.findByPk(nuevoHorarioId);


    if(!horario){
        return {ok:false,mensaje:"No se encontro el horario"};
    };

    if(!horario.activo){
        return {ok:false,mensaje:"El horario no esta disponible"}
    }

    const diasSemana=[
          "domingo",
        "lunes",
        "martes",
        "miercoles",
        "jueves",
        "viernes",
        "sabado",
    ];

    const fecha=new Date(`${nuevaFecha}T00:00:00`);
    const diaFecha=diasSemana[fecha.getDay()];

    if(diaFecha !== horario.dia){
        return {ok:false,mensaje:`La fecha seleccionada no corresponde al dia ${horario.dia}`};
    };
    
    const hoy =new Date();
    hoy.setHours(0,0,0,0);

    if(fecha<hoy){
        return {ok:false,mensaje:"No se puede modificar el turno a una fecha pasada"};
    };

    const turnoExistente = await Turno.findOne({
        where:{
            horarioId:nuevoHorarioId,
            fecha:nuevaFecha,
            estado:{[Op.ne]:"cancelado"},
            id:{[Op.ne]:id}
        }
    });

    if(turnoExistente){
        return {ok:false,mensaje:"Ese horario ya esta ocupado para la fecha seleccionada"};
    }

    await turno.update({horarioId:nuevoHorarioId,fecha:nuevaFecha,observaciones:datos.observaciones??turno.observaciones});

    return {ok:true,mensaje:"Turno modificado correctamente",turno};


};


const confirmarTurnoDB= async (id,rol)=>{
    if(rol!=="admin"){
        return {ok:false,mensaje:"Solo el admin puede confirmar turno"};
    }

    const turno = Turno.findByPk(id);

    if(!turno){
        return {ok:false,mensaje:"El turno no existe"};
    }

    if(turno.estado ==="cancelado"){
        return {ok:false,mensaje:"No se puede confirmar un turno cancelado"};
    }

    if(turno.estado==="confirmado"){
        return{ok:false,mensaje:"El turno ya esta confirmado."}
    }

    turno.estado="confirmado";
    await turno.update();

    return{ok:true,mensaje:"Turno confirmado correctamente",
        turno
    };
}

module.exports={crearTurnoDB,obtenerTurnosDB,cancelarTurnoDB,modificarTurnoDB,confirmarTurnoDB};