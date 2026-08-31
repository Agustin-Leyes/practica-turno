const { crearTurnoDB, obtenerTurnosDB, cancelarTurnoDB, modificarTurnoDB, confirmarTurnoDB } = require("../services/turno.service");

const crearTurno = async (req,res)=>{
    try {

        const pacienteId= req.usuario.id;
        const datos= req.body;
        const creado = await crearTurnoDB(pacienteId,datos);

        if(!creado.ok){
            return res.status(400).send({mensaje:creado.mensaje});
        }

        return res.status(201).json(creado);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}

const obtenerTurnos = async(req,res)=>{
     const turnos = await obtenerTurnosDB(req.usuario.id,req.usuario.rol);

     return res.status(200).json(turnos);
}


const cancelarTurno = async(req,res)=>{
    const id=req.params.id;
    const usuarioId=req.usuario.id;
    const rol=req.usuario.rol;

    const cancelado= await cancelarTurnoDB(id,usuarioId,rol)

    if(!cancelado.ok){
        return res.status(400).send({mensaje:cancelado.mensaje});
    }
    return res.status(200).send(cancelado);
}

const modificarTurno = async(req,res)=>{
    try {
        
        const id =req.params.id;
        const usuarioId=req.usuario.id;
        const rol=req.usuario.rol;
        const datos= req.body;

        const modificado= await modificarTurnoDB(id,usuarioId,rol,datos);

        if(!modificado.ok){
            return res.status(400).json({
                mensaje:modificado.mensaje
            });
        }

        return res.status(200).json(modificado);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}


confirmarTurno = async(req,res)=>{
    const id = req.params.id;
    const rol=req.usuario.rol;

    const confirmado= await confirmarTurnoDB(id,rol);

    if(!confirmado.ok){
        return res.status(400).sen({mensaje:confirmado.mensaje});
    }

    return res.status(200).send(confirmado);
}

module.exports={crearTurno,obtenerTurnos,cancelarTurno,modificarTurno}