import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import "./App.css";
import Button from "@mui/material/Button";
import Countdown from "../frontend/src/components/counter";

const App = () => {
  const treeRef = useRef(null);
  const fireRef = useRef(null);

  useEffect(() => {
    // Lad othe Lottie christmas-tree
    const treeAnim = lottie.loadAnimation({
      container: treeRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/christmas-tree.json",
    });

    const fireAnim = lottie.loadAnimation({
      container: fireRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/fire.json",
    });

    return () => {
      treeAnim.destroy();
      fireAnim.destroy();
    };
  }, []);

  return (
    <div className="App">
      <Countdown targetDate={new Date("December 22, 2023 23:59:59")} />
      <h1 style={{ fontSize: "4em", fontWeight: "bold", marginBottom: "20px" }}>
        A&M Christmas Pixie
      </h1>
      <Button variant="contained" color="primary" style={{ fontSize: "1.5em" }}>
        Join
      </Button>
      <div
        ref={treeRef}
        style={{ width: 400, height: 400, margin: "0 auto" }}
      ></div>
      <div
        ref={fireRef}
        style={{
          width: 200,
          height: 200,
          position: "absolute",
          bottom: "30px",
          right: "30px",
        }}
      ></div>
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      >
        <source src="/beach.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default App;
