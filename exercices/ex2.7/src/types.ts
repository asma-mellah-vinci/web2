interface Movie {
  id           : number;
  title        : string;
  director     : string;
  duration     : number;
  image?       : string;        // facultatif
  description? : string;        // facultatif
  budget?      : number;       // facultatif
}

export type { Movie };
