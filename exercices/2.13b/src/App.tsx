import { useState } from "react";
import RandomDog from "./component/RandomDog";


const App = () => {
  // bouton refresh 

  const [refreshkey , setRefreshKey] = useState(0);

  return (
    <div>

      <button onClick={() => setRefreshKey(refreshkey + 1)}>
        Refresh
      </button>

      <RandomDog key={refreshkey + "-1"}/>
      <RandomDog key={refreshkey + "-2"}/>
      <RandomDog key={refreshkey + "-3"}/>

    </div>
  )
};

export default App;