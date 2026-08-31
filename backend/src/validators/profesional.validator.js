const { z } = require("zod");

const validarProfesional=(req,res,next)=>{
    const body=req.body;

    const validadorProfesional=z.object({
        nombre:z.string().min(2,"Nombre obligatorio con mas de 1 caracter").regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras"),
        especialidad:z.string().min(1,"La especialidad es obligatoria"),
    })

    const resultado=validadorProfesional.safeParse({
        nombre:body.nombre,
        especialidad:body.especialidad,
    })
    if (!resultado.success) {
            return res.status(400).send({ errores: resultado.error.issues });
        }
      /*   if (!req.file) {
        return res.status(400).json({
            mensaje: "Falta agregar una imagen"
        });
    }  //LO COMENTE PORQUE TENGO 2 VARIANTES   CON ESTE USO EL MIDDLEWARE DE VALIDAR IMAGEN Y EL DE MODIFICAR USO LA FORMA COMO LA QUE COMENTE ACA.
 */
    req.body=resultado.data;
    next()
}

const validarProfesionalModificado=(req,res,next)=>{
    const body=req.body;

    const validadorProfesional=z.object({
        nombre:z.string("Debe ser un string.").min(2,"Nombre obligatorio con mas de 1 caracter").optional(),
        especialidad:z.string().min(1,"La especialidad es obligatoria").optional(),
        activo:z.boolean().optional(),
    })

    const resultado=validadorProfesional.safeParse({
        nombre:body.nombre,
        especialidad:body.especialidad,
        activo:body.activo,
    })
    if (!resultado.success) {
             return res.status(400).send({
        errores: resultado.error.issues.map(error => error.message)
    });
        }
      /*   if (!req.file) {
        return res.status(400).json({
            mensaje: "Falta agregar una imagen"
        });
    } */

    req.body=resultado.data;
    next()
}


const validarImagen = (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({
            mensaje: "Falta agregar una imagen"
        });
    }

    next();
};



module.exports={validarProfesional,validarImagen,validarProfesionalModificado};