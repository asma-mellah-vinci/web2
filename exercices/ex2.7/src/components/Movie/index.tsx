import type { Movie } from "../../types";

interface MovieProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieProps) => {
  return (
    <div>
      {movie.image && <img src={movie.image} alt={movie.title} width="150" />}
      <h3>{movie.title}</h3>
      <p>Réalisateur : {movie.director}</p>
      <p>Durée : {movie.duration} min</p>

      {/* conditionnel car pas obligatoire */}
      {movie.description && <p>{movie.description}</p>}
      {movie.budget && <p>{movie.budget} euro</p>}
    </div>
  );
};

export default MovieCard;
