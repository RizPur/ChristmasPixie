import React, { useState, useEffect } from 'react';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffff77',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // subtle shadow for depth
        margin: '20px auto',
    },
    text: {
        margin: '0 10px',
        color: '#d32f2f', 
        fontFamily: '"Mountains of Christmas", cursive', 
        fontSize: '28px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', 
    },
};

export default Countdown;