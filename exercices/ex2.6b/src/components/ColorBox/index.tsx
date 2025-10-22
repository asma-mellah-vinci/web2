import { useState } from "react";

const ColorBox = () => {
  const colors = ["red", "green", "blue", "yellow", "purple"];
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setIndex((index + 1) % colors.length);
  };

  const currentColor = colors[index];
  const nextColor = colors[(index + 1) % colors.length];

  return (
    <div
      style={{
        backgroundColor: currentColor,
        width: "200px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        color: "white",
        margin: "20px",
      }}
    >
      <button onClick={handleClick}>{nextColor}</button>
      <p>{currentColor}</p>
    </div>
  );
};

export default ColorBox;
