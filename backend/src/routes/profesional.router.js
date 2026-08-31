const { Router } = require("express");
const middlewareMulter = require("../middlewares/multer");
const { crearProfesional, obtenerProfesionales, obtenerProfesionalID, modificarProfesional, desactivarProfesional } = require("../controller/profesional.controller");
const verificarToken = require("../middlewares/verificarToken");
const esAdmin = require("../middlewares/esAdmin");
const {validarProfesional, validarProfesionalModificado, validarImagen} = require("../validators/profesional.validator");
const { obtenerHorariosProfesional, crearHorario, modificarHorario, bajaLogicaHorario } = require("../controller/horario.controller");
const validarHorario = require("../middlewares/validarHorario");
const validarModificarHorario = require("../middlewares/validarModificarHorario");

const profesionalRouter= Router();



profesionalRouter.post("/",verificarToken,esAdmin,middlewareMulter.single("imagen"),validarProfesional,validarImagen,crearProfesional);

profesionalRouter.get("/",obtenerProfesionales);

profesionalRouter.get("/:id",obtenerProfesionalID);


profesionalRouter.put("/:id",verificarToken,
    esAdmin,
    middlewareMulter.single("imagen"),validarProfesionalModificado,
    modificarProfesional)


profesionalRouter.patch("/:id/desactivar",verificarToken,esAdmin,desactivarProfesional);


profesionalRouter.get(
    "/:id/horarios",
    obtenerHorariosProfesional
);



profesionalRouter.post("/:id/horarios",verificarToken,esAdmin,validarHorario,crearHorario);


profesionalRouter.put(
    "/horarios/:id",
    verificarToken,
    esAdmin,
    validarModificarHorario,
    modificarHorario
);

profesionalRouter.delete("/:id",verificarToken,esAdmin,bajaLogicaHorario);



module.exports=profesionalRouter;