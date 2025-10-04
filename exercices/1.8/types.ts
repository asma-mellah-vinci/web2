interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface PizzaToUpdate {
  title?: string;
  content?: string;
}

type NewPizza = Omit<Pizza, "id">;

interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;   // > 0
  budget?: number;    // > 0 si présent
  description?: string;
  imageUrl?: string;
}

type NewFilm = Omit<Film, "id">;

interface FilmToUpdate {
  title?: string;
  director?: string;
  duration?: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
}


export type { Pizza, NewPizza, PizzaToUpdate , NewFilm , Film , FilmToUpdate };
