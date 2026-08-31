const { obtenerHorariosProfesionalDB, crearHorarioDB, modificarHorarioDB, bajaLogicaHorarioDB } = require("../services/horario.service");


//LO USO EN PROFESIONAL.ROUTER
const obtenerHorariosProfesional=async(req,res)=>{
    try{
    const {id}=req.params;
    const horarios= await obtenerHorariosProfesionalDB(id);

    return res.status(200).send(horarios);

    }catch(error){
        console.error(error);
        return res.status(500).json({
            mensaje:"Error interno del servidor.",
        });
    }
};


const crearHorario = async (req,res)=>{
    try {
        const {id}=req.params;
        const datos=req.body;

        const creado= await crearHorarioDB(id,datos);

        if(!creado.ok){
             return res.status(404).json({
                mensaje: creado.mensaje
            });
        }

        return res.status(201).json(creado.horario);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}


const modificarHorario = async(req,res)=>{
    try {
        
        const {id}=req.params;
        const datos=req.body;

        const modificado = await modificarHorarioDB(id,datos);

        if(!modificado.ok){
            return res.status(404).send({mensaje:modificado.mensaje})
        }

        return res.status(200).json(modificado);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });        
    }
}


const bajaLogicaHorario = async (req,res)=>{
    try {
        
        const id = req.params.id;
    
        const eliminado = await bajaLogicaHorarioDB(id);
    
        if(!eliminado.ok){
            return res.status(404).json({mensaje:eliminado.mensaje});
        }
    
        return res.status(200).send(eliminado);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });        
    }
}
module.exports={obtenerHorariosProfesional,crearHorario,modificarHorario,bajaLogicaHorario};