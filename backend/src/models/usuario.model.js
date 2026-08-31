const {DataTypes}=require("sequelize");
const conexion=require("../config/sequelize");

const Usuario=conexion.define("Usuario",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rol:{
        type:DataTypes.ENUM("paciente","admin"),
        allowNull:false,
        defaultValue:"paciente",
    },
    
});

module.exports=Usuario;
    