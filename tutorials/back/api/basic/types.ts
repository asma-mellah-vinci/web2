interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface PizzaToUpdate {
  title?: string;
  content?: string;
}

export interface Drink {
  id: number;
  title: string;
  image: string;
  volume: number; // en litres
  price: number;  // en euros
}


type NewPizza = Omit<Pizza, "id">;

export type { Pizza, NewPizza, PizzaToUpdate };
