import express, { ErrorRequestHandler } from "express";
import filmsRouter from "./routes/films";

const app = express();
app.use(express.json());

// on cree une variable qui commence a 0
let getCounter = 0;

app.use((req , _res, next) => {
  if(req.method === "GET"){
    getCounter = getCounter + 1;
    console.log("GET counter :", getCounter);
  }
  next();
});

app.use("/films", filmsRouter);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
};
app.use(errorHandler);

export default app;
