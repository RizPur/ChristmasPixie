import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {timeLeft.days ? (
        <h2 style={styles.text}>{timeLeft.days} days </h2>
      ) : null}
      {timeLeft.hours ? (
        <h2 style={styles.text}>{timeLeft.hours} hours </h2>
      ) : null}
      {timeLeft.minutes ? (
        <h2 style={styles.text}>{timeLeft.minutes} minutes </h2>
      ) : null}
      {timeLeft.seconds ? (
        <h2 style={styles.text}>{timeLeft.seconds} seconds </h2>
      ) : null}

      {Object.keys(timeLeft).length === 0 && (
        <h2 style={styles.text}>Countdown expired!</h2>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f5f5f5", // Cloudy white color
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Enhanced shadow for depth
    margin: "20px auto",
    border: "1px solid #e0e0e0", // Subtle border for definition
  },
  text: {
    margin: "0 10px",
    color: "#333", // Darker color for better readability
    fontFamily: '"Mountains of Christmas", cursive',
    fontSize: "28px",
    fontWeight: "bold",
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.15)", // Softer text shadow
  },
};

export default Countdown;
