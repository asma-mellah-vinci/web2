import { Router } from "express";
import path from "node:path";
import {parse , serialize} from "../utils/json";

interface Film {
  id            : number;
  title        : string;
  director     : string;
  duration     : number;   // >0
  budget?      : number;   // >0 SI PRESENT
  description? : string;
  imageUrl?    : string;
}

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  { id: 1, title: "Interstellar", director: "Christopher Nolan", duration: 169 },
  { id: 2, title: "Spirited Away", director: "Hayao Miyazaki", duration: 125 },
  { id: 3, title: "The Social Network", director: "David Fincher", duration: 120 }
];

const router = Router();


// GET + FILTRE minimum-duration
router.get("/", (req, res) => {
  const films = parse(jsonDbPath , defaultFilms);

  const request = req.query["minimum-duration"];

  if(request === undefined){
    return res.status(200).json(films);
  }

  const minDuration = Number(request);
  if(isNaN(minDuration) || minDuration <= 0){
    return res.status(400).json({ error: "Wrong minimum duration" });
  }

  const result = [];
  for(const film of films){
    if(film.duration >= minDuration){
      result.push(film);
    }
  }
  return res.status(200).json(result);
});

router.get("/:id", (req , res) => {
  const id = Number(req.params.id);
  if(isNaN(id) || id <= 0){
    return res.status(400).json({ error: "Wrong id"});
  }

  const films = parse(jsonDbPath , defaultFilms);

  let result : Film | undefined;
  for(const film of films){
    if(film.id === id){
      result = film;
      break;
    }
  }

  if(!result){
    return res.status(404).json({ error : "Film not foud"});
  }
  return res.status(200).json(result);
});


router.post("/", (req , res) => {
  const body = req.body as Film;

  if(!body || !body.title || !body.director || typeof body.duration !== "number"){
       return res.status(400).json({ error: "Missing required fields" });
  }

  if(body.duration <= 0){
     return res.status(400).json({ error: "Invalid duration" });
  }

  if(body.budget != undefined && body.budget <= 0){
     return res.status(400).json({ error: "Invalid budget" });
  }

  const films = parse(jsonDbPath, defaultFilms);

  for (const film of films) {
    if (film.title === body.title && film.director === body.director) {
      return res.status(409).json({ error: "Film déjà existant" }); // 409 Conflict
    }
  }

  let maxId = 0;
  for(const film of films){
    if(film.id > maxId){
      maxId = film.id;
    }
  }

  const newId = maxId + 1;

  const newFilm : Film = {
    id: newId,
    title: body.title,
    director: body.director,
    duration: body.duration,
    budget: body.budget,
    description: body.description,
    imageUrl: body.imageUrl,
  } as Film;

  films.push(newFilm);
  serialize(jsonDbPath , films); // ON SAUVEGARDE POUR PLUS TARD 
  return res.status(201).json(newFilm);

});


router.delete("/:id", (req , res) => {
  const id = Number(req.params.id);

  if(isNaN(id) || id <= 0){
    return res.status(400).json({ error : "Wrong id"});
  }

  const films = parse(jsonDbPath,defaultFilms);

  let index = -1;
  for(let i = 0; i < films.length ; i++){
    if(films[i].id === id){
      index = i;
      break;
    }
  }

  if(index === -1){
    return res.status(404).json({ error : "Film not found"});
  }

  films.splice(index,1);
  serialize(jsonDbPath,films);
  return res.status(204).end();
});


router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);

  if(isNaN(id) || id <= 0){
    return res.status(400).json({ error : "Wrong id"});
  }

  const films = parse(jsonDbPath , defaultFilms);

  let film : Film | undefined = undefined;
  for(let i = 0; i < films.length; i++){
    if(films[i].id === id){
      film = films[i];
      break;
    }
  }

  if(!film){
    return res.status(404).json({ error : "Film not found"});
  }

  const body = req.body;

   // Mettre à jour uniquement les propriétés envoyées
  if (body.title !== undefined) {
    film.title = body.title;
  }
  if (body.director !== undefined) {
    film.director = body.director;
  }
  if (body.duration !== undefined) {
    if (typeof body.duration !== "number" || body.duration <= 0) {
      return res.status(400).json({ error: "Invalid duration" });
    }
    film.duration = body.duration;
  }
  if (body.budget !== undefined) {
    if (typeof body.budget !== "number" || body.budget <= 0) {
      return res.status(400).json({ error: "Invalid budget" });
    }
    film.budget = body.budget;
  }
  if (body.description !== undefined) {
    film.description = body.description;
  }
  if (body.imageUrl !== undefined) {
    film.imageUrl = body.imageUrl;
  }

  serialize(jsonDbPath,films);
  return res.status(200).json(film); // renvoie le film mis à jour
});

router.put("/:id" , (req , res ) => {
  const id = Number(req.params.id);

  if(isNaN(id) || id <= 0){
    return res.status(400).json({ error : "Wrong id "});
  }

  const films = parse(jsonDbPath,defaultFilms);

  // on reprend les info que la personne donne
  const body = req.body;

  // on regarde si il a bien donner toute les info obligatoire
  if(!body || !body.title || !body.director || typeof body.duration !== "number"){
    return res.status(400).json({ error : "Missing required fields"});
  }

  if(body.duration <= 0){
    return res.status(404).json({ error : "Invalid duration"});
  }
  
  if(body.budget !== undefined && (typeof body.budget !== "number" || body.budget <= 0)){
    return res.status(404).json({ error : "Invalid budget"});
  }

  let index = -1;
  for(let i = 0; i < films.length ; i++){
    if(films[i].id === id){
      index = i;
      break;
    }
  }

  const newFilm : Film = {
    id,
    title : body.title,
    director : body.director,
    duration : body.duration,
    budget : body.budget,
    description : body.description,
    imageUrl : body.imageUrl
  };

  if(index !== -1){
    films[index] = newFilm;
    serialize(jsonDbPath, films);
    return res.status(200).json(films);
  }else{
    films.push(newFilm);
    serialize(jsonDbPath,films);
    return res.status(201).json(films);
  }
});


export default router;
