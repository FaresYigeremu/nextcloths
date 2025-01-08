"use client"; // This ensures it's a Client Component

import { useEffect, useState } from "react";

const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Create snowflakes dynamically
    const numberOfSnowflakes = 100; // Adjust as needed
    const snowflakesArray = Array.from({ length: numberOfSnowflakes }, (_, index) => index);
    setSnowflakes(snowflakesArray);
  }, []);

  return (
    <div className="snowfall">
      {snowflakes.map((_, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
