import { Movie, NewMovie } from "../types";


// FETCH GET ALL
const fetchMovies = async() : Promise<Movie[]> => {
  const response = await fetch("/api/films");

  if(!response){
    throw new Error("fetch get all error");
  }
  return await response.json();
};

// FETCH POST
const addMovie = async (movie : NewMovie) : Promise<Movie> => {

    const option = {
      method : "POST",
      body   : JSON.stringify(movie),
      headers: {
        "Content-Type" : "application/json",
      },
    };

    const response = await fetch("api/films", option);

    if(!response.ok){
      throw new Error("fetch addMovie Error");
    }

    return await response.json();

};

export {fetchMovies , addMovie};