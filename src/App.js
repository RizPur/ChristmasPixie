import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import './App.css';
import Button from '@mui/material/Button';

function App() {
  const animationContainer = useRef(null);

  useEffect(() => {
    // Lad othe Lottie christmas-tree 
    const anim = lottie.loadAnimation({
      container: animationContainer.current, 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/christmas-tree.json' 
    });
  
    return () => anim.destroy(); 
  }, []);
  

  return (
    <div className="App">
      <h1 style={{ fontSize: '4em', fontWeight: 'bold', marginBottom: '20px' }}>A&M Christmas Pixie</h1>
      <Button variant="contained" color="primary" style={{ fontSize: '1.5em' }}>
        Join
      </Button>
      <div ref={animationContainer} style={{ width: 400, height: 400, margin: '0 auto' }}></div>
      <video autoPlay loop muted style={{
        position: "absolute",
        width: "100%",
        left: "50%",
        top: "50%",
        height: "100%",
        objectFit: "cover",
        transform: "translate(-50%, -50%)",
        zIndex: "-1"
      }}>
        <source src="/beach.mp4" type="video/mp4"/>
      </video>
    </div>
  );
}

export default App;
