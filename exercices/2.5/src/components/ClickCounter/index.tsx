import { useState } from 'react'

interface ClickCounterProps {
    title : string;
    message : string;
    hoverMessage : string;
}

const ClickCounter = ({title , message , hoverMessage} : ClickCounterProps) => {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

   const handleClick = () => {
    console.log(`number of clicks before : ${count}`);
    setCount(count + 1);
  };

  
  return (
     <div className="card">
        <h2>{title}</h2>
        {isHovered && <p>{hoverMessage}</p>}

        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
        <button onClick={handleClick}>count is {count}</button>
        </div>
        {count >= 10 && <p>{message}</p>}
      </div>
  );
};

export default ClickCounter;

