import { useState } from 'react'

interface ClickCounterProps {
    title : string;
    message : string;
}

const ClickCounter = ({title , message} : ClickCounterProps) => {
  const [count, setCount] = useState(0);

   const handleClick = () => {
    console.log(`number of clicks before : ${count}`);
    setCount(count + 1);
  }
  
  return (
     <div className="card">
        <h2>{title}</h2>
        <button onClick={handleClick}> count is {count}</button>
        {count >= 10 && <p>{message}</p>}
      </div>
  );
};

export default ClickCounter;

