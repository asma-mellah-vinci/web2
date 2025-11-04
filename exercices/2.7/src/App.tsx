import { useState, type SyntheticEvent } from "react";
import type { Movie } from "./types";
import MovieCard from "./components/Movie";

const defaultMovies: Movie[] = [
  { id: 1, title: "Inception", director: "Christopher Nolan", duration: 148 },
  { id: 2, title: "Interstellar", director: "Christopher Nolan", duration: 169 },
  { id: 3, title: "Parasite", director: "Bong Joon-ho", duration: 132 },
  { id: 4, title: "The Dark Knight", director: "Christopher Nolan", duration: 152 },
  { id: 5, title: "Your Name", director: "Makoto Shinkai", duration: 106 },
];


function App() {
  // permet de changer movies quand on rajoute un film
  const [movies, setMovies] = useState<Movie[]>(defaultMovies);

 // dans le formulaire a la base tous est vide c'est apres quand on ajoute qu'il va s'ajouter grace a onChange
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  //3. quand on clique sur “ajouter”
  const handleSubmit = (e: SyntheticEvent) => {
    // permet de pas recharger la page
    e.preventDefault();

    // créer un nouvel objet film avec les info que l'utilisateur a donner
    const newMovie: Movie = {
      id: movies.length + 1,
      title,
      director,
      duration: Number(duration),
      image: image || undefined,
      description: description || undefined,
      // convertie le budget en number si il en a donner sinon rien
      budget: budget ? Number(budget) : undefined,
    };

    // ajouter à la liste existante
    setMovies([...movies, newMovie]);

    // vider le formulaire
    setTitle("");
    setDirector("");
    setDuration("");
    setImage("");
    setDescription("");
    setBudget("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mes films préférés</h1>

      {/* Affichage de tous les films */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {/* Formulaire d’ajout */}
      <div style={{ border: "1px solid gray", padding: "10px", marginTop: "20px" }}>
        <h2>Ajouter un film</h2>


        <form onSubmit={handleSubmit}>
          <label>
            Titre :
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <br />

          <label>
            Réalisateur :
            <input
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
          </label>
          <br />

          <label>
            Durée (min) :
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </label>
          <br />

          <label>
            Image (URL) :
            <input value={image} onChange={(e) => setImage(e.target.value)} />
          </label>
          <br />

          <label>
            Description :
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />

          <label>
            Budget (M$) :
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </label>
          <br />

          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default App;
