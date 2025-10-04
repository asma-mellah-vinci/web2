import { Router } from "express";
import {createOneFilm, deleteOneFilm, readAllFilms, readOneFilm, replaceOneFilm, updateOneFilm} from "../services/films"
import { FilmToUpdate, NewFilm } from "../types";


const router = Router();


// GET ALL
router.get("/", (req , res) => {
  const request = req.query["minimum-duration"];

  if(request !== undefined){
    const minDuration = Number(request);
    if(isNaN(minDuration) || minDuration <= 0){
      return res.status(400).json({error : "Wrong minimum duration"});
    }
    return res.status(200).json(readAllFilms(minDuration));
  }


  return res.status(200).json(readAllFilms());
});


// GET BY ID
router.get("/:id" , (req , res ) => {
  const id = Number(req.params.id);
  if(isNaN(id) || id <= 0){
    return res.status(400).json({ error : "Wrong id"});
  }

  const  film = readOneFilm(id);

  if(!film){
    return res.status(404).json({ error : "Film not found"});
  }

  return res.status(200).json(film);
});

// POST
router.post("/" , (req , res ) => {
  const body = req.body;

  if(!body || !body.title || !body.director || typeof body.duration !== "number"){
       return res.status(400).json({ error: "Missing required fields" });
  }

   if(body.duration <= 0){
     return res.status(400).json({ error: "Invalid duration" });
  }

  if(body.budget != undefined && body.budget <= 0){
     return res.status(400).json({ error: "Invalid budget" });
  }

const newFilm = createOneFilm({
    title : body.title,
    director : body.director,
    duration : body.duration,
    budget : body.budget,
    description : body.description,
    imageUrl : body.imageUrl,
  });

  return res.status(201).json(newFilm);
});



router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Wrong id" });
  }

  const deletedFilm = deleteOneFilm(id);

  if (!deletedFilm) {
    return res.status(404).json({ error: "Film not found" });
  }

  return res.status(200).json(deletedFilm);
});

router.patch("/:id", (req , res) => {
  const id = Number(req.params.id);
  const body = req.body as FilmToUpdate;

  if(isNaN(id) || id <= 0){
    return res.status(400).json({error : "Wrong id"});
  }

  if (!body || typeof body !== "object") {
    return res.status(400).json({ error: "Invalid body" });
  }

   if (body.title !== undefined && (typeof body.title !== "string" || !body.title.trim())) {
    return res.status(400).json({ error: "Invalid title" });
  }

  if (body.director !== undefined && (typeof body.director !== "string" || !body.director.trim())) {
    return res.status(400).json({ error: "Invalid director" });
  }

  if (body.duration !== undefined && (typeof body.duration !== "number" || body.duration <= 0)) {
    return res.status(400).json({ error: "Invalid duration" });
  }

  if (body.budget !== undefined && (typeof body.budget !== "number" || body.budget <= 0)) {
    return res.status(400).json({ error: "Invalid budget" });
  }

  const updatedFilm = updateOneFilm(id, body);

  if (!updatedFilm) {
    return res.status(404).json({ error: "Film not found" });
  }

  return res.status(200).json(updatedFilm);

});


router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body as NewFilm;

  // Vérification de l'id
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Wrong id" });
  }

  // Vérification des champs obligatoires
  if (!body || !body.title || !body.director || typeof body.duration !== "number") {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validation du contenu des champs
  if (typeof body.title !== "string" || body.title.trim() === "") {
    return res.status(400).json({ error: "Invalid title" });
  }

  if (typeof body.director !== "string" || body.director.trim() === "") {
    return res.status(400).json({ error: "Invalid director" });
  }

  if (body.duration <= 0) {
    return res.status(400).json({ error: "Invalid duration" });
  }

  if (body.budget !== undefined && (typeof body.budget !== "number" || body.budget <= 0)) {
    return res.status(400).json({ error: "Invalid budget" });
  }

  const replacedFilm = replaceOneFilm(id, {
    title: body.title,
    director: body.director,
    duration: body.duration,
    budget: body.budget,
    description: body.description,
    imageUrl: body.imageUrl,
  });

  let status: number;
  const existing = readOneFilm(id);
  if (existing) {
    status = 200;
  } else {
    status = 201;
  }

  return res.status(status).json(replacedFilm);
});



export default router;
