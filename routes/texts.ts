import { Router } from "express";
import { Level, NewText } from "../types";
import { createOneText, deleteOneText, readAllTexts, readOneText, replaceOneText } from "../services/texts";


const router = Router();


router.get("/" , (req, res) => {
    const LevelQuery = req.query["level"];

    if(LevelQuery !== undefined && !Object.values(Level).includes(LevelQuery as Level)){
        return res.status(400).json({ error: "Invalid level" });
    }

    const texts = readAllTexts(LevelQuery as Level | undefined);
    return res.status(200).json(texts);
})

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const text = readOneText(id);

  if (!text) {
    return res.status(404).json({ error: "Text not found" });
  }

  return res.status(200).json(text);
});

router.post("/", (req, res) => {
  const body = req.body as NewText;

  if (!body || !body.content || !body.level) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof body.content !== "string" || body.content.trim() === "") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (!Object.values(Level).includes(body.level as Level)) {
    return res.status(400).json({ error: "Invalid level" });
  }

  const newText = createOneText({
    content: body.content,
    level: body.level as Level,
  });

  return res.status(201).json(newText);
});



router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const deletedText = deleteOneText(id);

  if (!deletedText) {
    return res.status(404).json({ error: "Text not found" });
  }

  return res.status(200).json(deletedText);
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body as NewText;

  if (!body || !body.content || !body.level) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (typeof body.content !== "string" || body.content.trim() === "") {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (!Object.values(Level).includes(body.level as Level)) {
    return res.status(400).json({ error: "Invalid level" });
  }

  const replacedText = replaceOneText(id, {
    content: body.content,
    level: body.level as Level,
  });

  return res.status(200).json(replacedText);
});

export default router;