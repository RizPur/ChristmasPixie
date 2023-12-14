import React from 'react';
import './App.css';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <h1 style={{ fontSize: '6em', fontWeight: 'bold', marginBottom: '20px' }}>Christmas Pixie</h1>
      <Button variant="contained" color="primary" style={{ fontSize: '2.5em' }}>
        Join
      </Button>
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
