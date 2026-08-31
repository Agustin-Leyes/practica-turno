require("dotenv").config();
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
const path = require("path");

const express=require("express");
const conexion = require("./config/sequelize");
const profesionalRouter = require("./routes/profesional.router");

const authRouter = require("./routes/auth.router");
const turnoRouter = require("./routes/turno.router");

require("./associations/profesionalHorario");
require("./associations/turno");

const app=express();
const cors = require("cors");
app.use(cors());

app.use(express.json());


//Lo que esta dentro de uploads mi carepta original  , dale acceso a eso desde /imagenes.?????
app.use(
    "/imagenes",
    express.static(path.join(__dirname, "uploads"))
);

app.use("/profesionales",profesionalRouter);

app.use("/auth",authRouter);

app.use("/turnos",turnoRouter);

app.use((req,res)=>{
    res.status(404).send({message:"no existe este endpoint"});
});

(async () => {
 
    await conexion.authenticate();
    console.log("DB conectada");

    await conexion.sync();
    console.log("Tablas sincronizadas");

    app.listen(process.env.PORT, () => {
      console.log("Servidor en puerto 3000");
    });

})();