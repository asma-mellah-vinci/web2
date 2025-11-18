import { useEffect, useState } from "react";
import "./RandomDog.css";


interface dog {
  message : string;
  status : string;
}


const RandomDog = () => {
    const [dog , setDog] = useState<dog | undefined>(undefined);

    useEffect(() => {

        const interval = setInterval(async () => {
            fetchRandomDog();
        } , 5000);

        return () => clearInterval(interval);
        
    } , []);

    const fetchRandomDog = async () => {

        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");

            if(!response.ok){
                throw new Error("fetch error");
            }

            const randomDog = await response.json();
            setDog({
                message : randomDog.message,
                status : randomDog.status,
            });
            
        } catch (error) {
            console.error(error);
        }
    }

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