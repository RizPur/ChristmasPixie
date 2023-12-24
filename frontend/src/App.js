import React, { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";
import "./App.css";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FaceIcon from "@mui/icons-material/Face";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown from "./components/counter";
import Person from "./components/person";

const toastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function App() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [likes, setLikes] = useState("");
  const [email, setEmail] = useState("");

  const [people, setPeople] = useState([])

  const treeRef = useRef(null);
  const fireRef = useRef(null);

  const animationContainer = useRef(null);

  useEffect(() => {
    // Load the Lottie christmas-tree
    const treeAnim = lottie.loadAnimation({
      container: treeRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/christmas-tree.json",
    });

    // Load the Lottie fire
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

  useEffect(() => {
    fetch('http://localhost:3001/get-data')
      .then(response => response.json())
      .then(data => setPeople(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNameChange = (event) => setName(event.target.value);
  const handleLikesChange = (event) => setLikes(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3001/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, likes }),
    })
      .then((response) => response.text())
      .then((data) => {
        toast.success(
          `🎉 Yay! Thanks, ${name}! You're a good yute!`,
          toastOptions
        );
        handleClose(); // Close the modal after submission
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(
          "Oops! Something went wrong. Please try again.",
          toastOptions
        );
      });
  };
  return (
    <div className="App">
      <Countdown targetDate={new Date("December 28, 2023 23:59:59")} />
      <h1 style={{ fontSize: "4em", fontWeight: "bold", marginBottom: "20px" }}>
        A&M Christmas Pixie
      </h1>
      <Button
        variant="contained"
        color="primary"
        style={{ fontSize: "1.5em" }}
        onClick={handleOpen}
      >
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
      <div className="person-container">
        {people.map((person, index) => (
          <div style={{
            position: 'absolute',
            top: `${Math.random() * 50}%`, // Randomize position below bottom half of screen
            left: `${Math.random() * 80}%`
          }}>
            <Person key={index} person={person} />
          </div>
        ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            border: "2px solid #000",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            textAlign: "center",
            background: "linear-gradient(45deg, #503423 30%, #1F1D1A 90%)",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "white",
            }}
          >
            JOIN YA MAN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <FaceIcon sx={{ color: "white", mr: 1 }} />

            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={handleNameChange}
              margin="normal"
              variant="outlined"
              style={{ background: "white", borderRadius: "5px" }}
            />

            <EmailIcon sx={{ color: "white", mr: 1 }} />

            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              variant="outlined"
              style={{ background: "white", borderRadius: "5px" }}
            />
            <FavoriteIcon sx={{ color: "white", mr: 1 }} />

            <TextField
              fullWidth
              label="What You Like"
              value={likes}
              onChange={handleLikesChange}
              margin="normal"
              variant="outlined"
              style={{ background: "white", borderRadius: "5px" }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                padding: "10px",
                fontSize: "1em",
                backgroundColor: "white", // Custom background color
                color: "black", // Text color
                "&:hover": {
                  backgroundColor: "orange", // Color on hover
                },
              }}
            >
              Let's Go!
            </Button>
          </Box>
        </Box>
      </Modal>
      <div
        ref={animationContainer}
        style={{ width: 400, height: 400, margin: "0 auto" }}
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
      <ToastContainer />
    </div>
  );
}

export default App;
