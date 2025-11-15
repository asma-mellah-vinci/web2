import { useMatch, useOutletContext } from "react-router-dom";
import { MovieContext } from "../../types";
import MovieCard from "../MovieCard";


const MoviePage = () => {
    const {movies} : MovieContext = useOutletContext();

    // match recupere l'id
    const match = useMatch("/movies/:id");

    // convertir en id
    const movieId = Number(match?.params.id);

    if(isNaN(movieId)){
        return <p>Movie not found</p>
    }

    let movieFound = null;

    for (let i = 0; i < movies.length; i++) {
        
        if (movies[i].id === movieId) {
            movieFound = movies[i];
            break;
        }
    }


    if(!movieFound){
        return <p>Movie not found</p>
    }

    return <MovieCard movie={movieFound} />;
};

export default MoviePage; 