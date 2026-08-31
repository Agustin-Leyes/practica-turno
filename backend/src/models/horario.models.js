const { DataTypes } = require("sequelize");
const conexion = require("../config/sequelize");

const Horario=conexion.define("Horario",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    profesionalId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    dia:{
        type:DataTypes.ENUM(
            "lunes",
            "martes",
            "miercoles",
            "jueves",
            "viernes",
            "sabado",
            "domingo",
        ),
        allowNull:false,
    },
    horaInicio:{
        type:DataTypes.TIME,
        allowNull:false,
    },
    horaFin:{
        type:DataTypes.TIME,
        allowNull:false,
    },
     activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
},{
    createdAt: false,
    updatedAt: false,
});

module.exports=Horario;