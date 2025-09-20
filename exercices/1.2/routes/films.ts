import { Router } from "express";

interface Film {
  id            : number;
  title        : string;
  director     : string;
  duration     : number;
  budget?      : number;
  description? : string;
  imageUrl?    : string;
}

const films: Film[] = [
  { id: 1, title: "Interstellar", director: "Christopher Nolan", duration: 169 },
  { id: 2, title: "Spirited Away", director: "Hayao Miyazaki", duration: 125 },
  { id: 3, title: "The Social Network", director: "David Fincher", duration: 120 }
];

const router = Router();

router.get("/", (_req, res) => {
  res.json(films);
});

export default router;
