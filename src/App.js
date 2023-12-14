import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ zIndex: 2 }}>
        Ackee and Morou Christmas Pixie
      </div>
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
