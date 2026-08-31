const Horario = require("../models/horario.models");
const Profesional = require("../models/profesional.models");
const Turno = require("../models/turno.model");
const Usuario = require("../models/usuario.model");
Usuario.hasMany(Turno,{
    foreignKey:"pacienteId",
});
Turno.belongsTo(Usuario,{
    foreignKey:"pacienteId",
});


Profesional.hasMany(Turno,{
    foreignKey:"profesionalId",
});
Turno.belongsTo(Profesional,{
    foreignKey:"profesionalId",
});


Horario.hasMany(Turno,{
    foreignKey:"horarioId",
});
Turno.belongsTo(Horario,{
    foreignKey:"horarioId",
});




