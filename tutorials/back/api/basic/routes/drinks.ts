import { Router } from "express";
import { Drink } from "../types";

const drinks: Drink[] = [
  { id: 1, title: "Coca-Cola", image: "https://...", volume: 0.33, price: 2.5 },
  { id: 2, title: "Pepsi",     image: "https://...", volume: 0.33, price: 2.5 },
  { id: 3, title: "Eau",       image: "https://...", volume: 0.5,  price: 1.5 },
];

const router = Router();

// READ ALL
router.get("/", (_req, res) => {
  return res.json(drinks); // 200 OK auto
});

// READ ONE (option du cours)
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const drink = drinks.find(d => d.id === id);
  if (!drink) return res.sendStatus(404);
  return res.json(drink);
});

// Simuler une erreur (option du cours)
router.get("/error/test", () => {
  throw new Error("This is an error");
});

export default router;
