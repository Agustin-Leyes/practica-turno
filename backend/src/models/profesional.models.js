const { DataTypes } = require("sequelize");
const conexion = require("../config/sequelize");

const Profesional=conexion.define("Profesional",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    especialidad:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    activo:{
        type:DataTypes.BOOLEAN,
        defaultValue:true,
    }
}, {
    createdAt: false,
    updatedAt: false,
});

module.exports=Profesional;
