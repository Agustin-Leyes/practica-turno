const {z}=require ("zod");


const validarHorario = (req,res,next)=>{
    const validadorHorario= z.object({
        dia:z.enum([
            "lunes",
            "martes",
            "miercoles",
            "jueves",
            "viernes",
            "sabado",
            "domingo"]),
            horaInicio:z.string().min(1,"La hora de inicio es obligatoria"),
            horaFin:z.string().min(1,"La hora fin es obligatoria")
    }).refine(datos => datos.horaInicio < datos.horaFin,
        {   message: "la hora de inicio debe ser anteiorr a la hora de fin",
            path:["horaInicio"],
        }
    );

    const resultado=validadorHorario.safeParse(req.body);


    if (!resultado.success) {
        return res.status(400).json({
            errores: resultado.error.issues
        });
    }
    req.body = resultado.data;

    next();

}

module.exports= validarHorario;