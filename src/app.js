import dotenv from "dotenv";
import {pool} from "./database/db.js"
import express from "express";
import cors from "cors";
import morgan from "morgan";
import assetsRoutes from "./routes/assets.routes.js"




dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/assets", assetsRoutes);

pool.connect()
    .then(()=>{
        console.log("Base de datos Conectada");
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    res.json({
        message: "API funcionando correctamente"
    });
});

app.get("/health", (req, res) =>{
    res.json({
        status:"ok"
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
});