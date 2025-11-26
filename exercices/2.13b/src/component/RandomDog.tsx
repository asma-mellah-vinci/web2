import { useEffect, useState } from "react";
import "./RandomDog.css";


interface dog {
  message : string;
  status : string;
}


const RandomDog = () => {
    const [dog , setDog] = useState<dog | undefined>(undefined);

    useEffect(() => {

        fetch("https://dog.ceo/api/breeds/image/random")
        .then((response) => {
           return response.json();
        })
        .then((data) => {
            setDog({
                message : data.message,
                status : data.status
            });
        });
    } , []);

    if(!dog){
        return <p>Loading...</p>;
    }

    return (
        <img 
        className="random-dog"
        src={dog.message} 
        alt="random dog"
         />
    );
}

export default RandomDog;