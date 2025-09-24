import { Router } from "express";

interface Film {
  id            : number;
  title        : string;
  director     : string;
  duration     : number;   // >0
  budget?      : number;   // >0 SI PRESENT
  description? : string;
  imageUrl?    : string;
}

const films: Film[] = [
  { id: 1, title: "Interstellar", director: "Christopher Nolan", duration: 169 },
  { id: 2, title: "Spirited Away", director: "Hayao Miyazaki", duration: 125 },
  { id: 3, title: "The Social Network", director: "David Fincher", duration: 120 }
];

const router = Router();



// GET + FILTRE minimum-duration
router.get("/", (req, res) => {

  const request = req.query["minimum-duration"];

  if(request === undefined){
    return res.json(films);
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
  return res.json(result);
});

router.get("/:id", (req , res) => {
  const id = Number(req.params.id);
  if(isNaN(id) || id <= 0){
    return res.status(400).json({ error: "Wrong id"});
  }

  let result : Film | undefined;
  for(const film of films){
    if(film.id === id){
      result = film;
      break;
    }
  }

  if(!result){
    res.status(404).json({ error : "Film not foud"});
  }
  return res.json(result);
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
  return res.status(201).json(newFilm);

});
export default router;

