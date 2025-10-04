enum Level {
  EASY     = "easy",
  MEDIUM   = "medium",
  HARD     = "hard"
}


interface Text {
 id      : string; // via ID
 content : string;
 level   : Level;
}

type NewText = Omit<Text , "id">;
export {Level};
export type {NewText ,Text};

