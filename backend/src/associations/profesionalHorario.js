const Profesional=require("../models/profesional.models")
const Horario = require("../models/horario.models");

Profesional.hasMany(Horario,{
    foreignKey:"profesionalId",
});

Horario.belongsTo(Profesional,{
    foreignKey:"profesionalId",
})