const { crearProfesionalDB, obtenerProfesionalesDB, obtenerProfesionalIDDB, modificarProfesionalDB, desactivarProfesionalDB } = require("../services/profesional.service");

const crearProfesional=async(req,res)=>{
   try {   

    console.log("ARCHIVO:", req.file);
    const datos=req.body;
    const imagen=req.file.filename;
    const creado= await crearProfesionalDB(datos,imagen);

    if(!creado.ok){
        return res.status(400).json({mensaje:resultado.mensaje});
    }

    return res.status(201).json(creado.profesional);

   } catch (error) {
        console.error(error);
        return res.status(500).json({mensaje: "Error interno del servidor."});
    }
};

const obtenerProfesionales=async(req,res)=>{
    try{
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)|| 6;

    const offset=(page-1)*limit;

    const resultado=await obtenerProfesionalesDB(limit,offset);

    return res.status(200).send({
        page,
        limit,
        total:resultado.count,
        profesionales:resultado.rows
        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}


const obtenerProfesionalID=async(req,res)=>{
    try {
        const { id } = req.params;

        const profesional = await obtenerProfesionalIDDB(id);

        if (!profesional) {
            return res.status(404).json({
                mensaje: "Profesional no encontrado"
            });
        }

        return res.status(200).json(profesional);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}


const modificarProfesional = async(req,res)=>{
    try{
    const {id}=req.params;
    const datos={...req.body};

    if(req.file){
        datos.imagen=req.file.filename;
        }
    const modificado = await modificarProfesionalDB(id,datos);

    if(!modificado.ok){
        return res.status(404).send({mensaje:modificado.mensaje});
        }

        return res.status(200).send(modificado.profesional);

    }catch(error){
         console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}

const desactivarProfesional=async(req,res)=>{
    try {
        
        const {id}=req.params;  
        const resultado= await desactivarProfesionalDB(id);

        if(!resultado.ok){
            return res.status(404).send({mensaje:resultado.mensaje});
        }

        return res.status(200).send(resultado);

    } catch (error) {
         console.error(error);

        return res.status(500).json({
            mensaje: "Error interno del servidor"
        });
    }
}

module.exports={crearProfesional,obtenerProfesionales,obtenerProfesionalID,modificarProfesional,desactivarProfesional}