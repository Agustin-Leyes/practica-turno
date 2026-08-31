const { DataTypes } = require("sequelize");
const conexion = require("../config/sequelize");

const Turno = conexion.define("Turno",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    pacienteId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    profesionalId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    horarioId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    estado:{
        type:DataTypes.ENUM("pendiente","confirmado","cancelado"),
        defaultValue:"pendiente",
        allowNull:false,
    },

    observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    createdAt: false,
    updatedAt: false
})

module.exports=Turno;