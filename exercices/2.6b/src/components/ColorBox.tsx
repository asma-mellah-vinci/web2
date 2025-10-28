import { useState } from "react";


const ColorBox = () => {
    const colors = ["red","green","blue","yellow","violet"];
    const [index, setIndex] = useState(0);


    const handleClick = () => {
        setIndex((prev) => (prev + 1) % colors.length);
    };


    return (
        <div style={{
            backgroundColor : colors[index]
        }}>
            <button onClick={handleClick}>
                {colors[(index + 1) % colors.length]}
            </button>
            <p>{colors[index]}</p>
        </div>
    );
};

export default ColorBox;