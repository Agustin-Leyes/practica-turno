const express=require("express");
const verificarToken = require("../middlewares/verificarToken");
const { crearTurno, obtenerTurnos, cancelarTurno, modificarTurno } = require("../controller/turno.controller");
const turnoRouter=express.Router();
const esAdmin = require("../middlewares/esAdmin");
turnoRouter.post("/",verificarToken,crearTurno);

turnoRouter.get(
    "/",
    verificarToken,
    obtenerTurnos
);

turnoRouter.put("/:id/cancelar",verificarToken,cancelarTurno);

turnoRouter.put("/:id",verificarToken,modificarTurno);

turnoRouter.put(
    "/:id/confirmar",
    verificarToken,esAdmin,
    confirmarTurno
);
module.exports=turnoRouter;