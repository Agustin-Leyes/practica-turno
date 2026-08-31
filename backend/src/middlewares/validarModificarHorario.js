const { z } = require("zod");

const validarModificarHorario = (req, res, next) => {

    const schemaHorario = z.object({
        dia: z.enum([
            "lunes",
            "martes",
            "miercoles",
            "jueves",
            "viernes",
            "sabado",
            "domingo"
        ]).optional(),

        horaInicio: z.string()
            .regex(
                /^([01]\d|2[0-3]):[0-5]\d$/,
                "La hora de inicio debe tener formato HH:MM"
            )
            .optional(),

        horaFin: z.string()
            .regex(
                /^([01]\d|2[0-3]):[0-5]\d$/,
                "La hora de fin debe tener formato HH:MM"
            )
            .optional(),

        activo: z.boolean().optional()
    });

    const resultado = schemaHorario.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            errores: resultado.error.issues
        });
    }

    req.body = resultado.data;

    next();
};

module.exports = validarModificarHorario;