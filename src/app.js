import dotenv from "dotenv";
import { pool } from "./database/db.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import assetsRoutes from "./routes/assets.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

// 1. Middlewares globales
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// 2. Rutas de diagnóstico rápido
app.get("/", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// 3. Rutas principales de tu aplicación
app.use("/assets", assetsRoutes);
app.use("/auth", authRoutes);

// 4. Conexión a la Base de Datos (No bloqueante)
pool.connect()
    .then(() => {
        console.log("Base de datos Conectada exitosamente");
    })
    .catch((error) => {
        console.error("Error al conectar la Base de Datos:", error);
    });

// 5. Manejador de errores global (Debe ir estrictamente aquí)
app.use(errorHandler);

// 6. Encendido del servidor
const PORT = process.env.PORT || 3000;
// Escucha en "0.0.0.0" para evitar bloqueos de IP en entornos locales
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
