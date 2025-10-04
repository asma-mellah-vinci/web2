import express from "express";
import textsRouter from "./routes/texts";

const app = express();
app.use(express.json());

// Routes principales
app.use("/texts", textsRouter);

export default app;
