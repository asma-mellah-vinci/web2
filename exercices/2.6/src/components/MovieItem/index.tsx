import { useState } from "react";


interface MovieItemProps {
    title : string;
    director : string;
    description : string;
}


const MovieItem = ({title,director,description} : MovieItemProps) => {
    // permet de savoir si la description est visible ou caché
    // showDescription (valeur actuel)
    // setShowDescription (fonction pour changer la valeur )
    // false pcq par defaut elle est caché 

    const [showDescription, setShowDescription] = useState(false);
    return (
        <div onClick={() => setShowDescription(!showDescription)}>
            <h3>{title}</h3>
            <p>Réalisé par : {director}</p>
            {showDescription && <p>{description}</p>}
        </div>
    );
};

export default MovieItem