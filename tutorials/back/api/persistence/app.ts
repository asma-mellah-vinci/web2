import express, { ErrorRequestHandler } from "express";
import drinksRouter from "./routes/drinks";

const app = express();

// petit log global (application-level middleware)
app.use((_req, _res, next) => {
  console.log("Time:", new Date().toLocaleString("fr-FR", { timeZone: "Europe/Brussels" }));
  next();
});

app.use(express.json()); // nécessaire pour lire req.body plus tard
app.use("/drinks", drinksRouter);

// handler d’erreurs (4 paramètres)
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
};
app.use(errorHandler);

export default app;
