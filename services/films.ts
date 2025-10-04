import path from "node:path";
import { parse , serialize } from "../utils/json";
import { Film, FilmToUpdate, NewFilm } from "../types";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  { id: 1, title: "Interstellar", director: "Christopher Nolan", duration: 169 },
  { id: 2, title: "Spirited Away", director: "Hayao Miyazaki", duration: 125 },
  { id: 3, title: "The Social Network", director: "David Fincher", duration: 120 }
];

function readAllFilms(minDuration?: number) : Film [] {
    const films = parse(jsonDbPath , defaultFilms);

    if(!minDuration){
        return films;
    }

    const result: Film[] = [];
    for(const f of films){
        if(f.duration >= minDuration){
            result.push(f);
        }
    }

    return result;
}


function readOneFilm(id : number) : Film  | undefined{
    const films = parse(jsonDbPath, defaultFilms);

    let result : Film | undefined = undefined;
    for(const f of films){
        if(f.id === id){
            result = f;
            break;
        }
    }

    if(!result){
        return undefined;
    }

    return result;

}


function createOneFilm(newFilm : NewFilm) : Film {
    const films = parse(jsonDbPath , defaultFilms);

    let maxId = 0;
    for( const f of films){
        if(f.id > maxId){
            maxId = f.id;
        }
    }

    const nextId = maxId + 1;
    const createdFilm : Film = {
        id : nextId,
        title : newFilm.title,
        director : newFilm.director,
        duration : newFilm.duration,
        budget : newFilm.budget,
        description : newFilm.description,
        imageUrl : newFilm.imageUrl
    };

    films.push(createdFilm);
    serialize(jsonDbPath, films);
    return createdFilm;
}

function deleteOneFilm(id : number) : Film | undefined {
      const films = parse(jsonDbPath, defaultFilms);

      let index = -1;
      for(let i = 0; i < films.length ; i++){
        if(films[i].id === id){
            index = i;
            break;
        }
      }

      if(index === -1){
        return undefined;
      }

      const deletedFilm  = films.splice(index,1)[0];
      serialize(jsonDbPath,films);
      return deletedFilm;
}

function updateOneFilm(id : number, filmToUpdate : FilmToUpdate) : Film | undefined {
    const films = parse(jsonDbPath , defaultFilms);
    let film : Film | undefined = undefined;

    for(const f of films){
        if(f.id === id){
            film = f;
            break;
        }
    }

    if(!film){
        return undefined;
    }

    if (filmToUpdate.title !== undefined) {
      film.title = filmToUpdate.title;
    }

    if (filmToUpdate.director !== undefined) {
      film.director = filmToUpdate.director;
    }

    if (filmToUpdate.duration !== undefined) {
      film.duration = filmToUpdate.duration;
    }

    if (filmToUpdate.budget !== undefined) {
      film.budget = filmToUpdate.budget;
    }

    if (filmToUpdate.description !== undefined) {
      film.description = filmToUpdate.description;
    }

    if (filmToUpdate.imageUrl !== undefined) {
      film.imageUrl = filmToUpdate.imageUrl;
    }

    serialize(jsonDbPath, films);
    return film;
}

function replaceOneFilm(id : number , newFilm : NewFilm) : Film {
    const films = parse(jsonDbPath, defaultFilms);

    let index = -1;
     for (let i = 0; i < films.length; i++) {
    if (films[i].id === id) {
      index = i;
      break;
    }
  }

  const film: Film = {
  id: id,
  title: newFilm.title,
  director: newFilm.director,
  duration: newFilm.duration,
  budget: newFilm.budget,
  description: newFilm.description,
  imageUrl: newFilm.imageUrl,
  };

   if (index !== -1) {
    films[index] = film;
    serialize(jsonDbPath, films);
    return film;
  } else {
    films.push(film);
    serialize(jsonDbPath, films);
    return film;
  }


}


export { readAllFilms };
export { readOneFilm };
export { createOneFilm };
export { deleteOneFilm};
export { updateOneFilm};
export { replaceOneFilm };