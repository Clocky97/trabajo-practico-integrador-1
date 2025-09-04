import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import { errorHandler } from "./src/middlewares/error_handler.js";

// Rutas
import articleRoutes from "./src/routes/article.routes.js";
import tagRoutes from "./src/routes/tag.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api/articles", articleRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar base de datos y servidor
const PORT = process.env.PORT || 3000;
startDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});