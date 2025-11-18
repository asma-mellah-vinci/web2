import { useEffect, useState } from "react";

interface Joke {
  joke     : string;
  category : string;
}


const App = () => {
  const [joke , setJoke] = useState<Joke | undefined>(undefined);

  useEffect(() => {

    const interval = setInterval(() => {

      fetch("https://v2.jokeapi.dev/joke/Any?type=single")
      .then((response) => {
            return response.json();
      })
      .then((data) => {
         setJoke({
          joke : data.joke,
          category : data.category
        });
      });
      
    } , 10000);
    return () => clearInterval(interval);
  } , []);

  if(!joke){
    return <p>Loading....</p>;
  }

  return (
    <div>
      <h3>Random joke</h3>
      <h4>{joke.category}</h4>
      <p>{joke.joke}</p>
      <p>https://v2.jokeapi.dev/joke.category</p>
    </div>
  )

};

export default App;