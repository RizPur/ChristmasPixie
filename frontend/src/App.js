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
// import musicFile from "./ChristmasMusic.mp3";
import IconButton from "@mui/material/IconButton";
// import MusicNoteIcon from "@mui/icons-material/MusicNote";

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
  const treeRef = useRef(null);
  const fireRef = useRef(null);
  // const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [signedUpNames, setSignedUpNames] = useState([]);

  const animationContainer = useRef(null);

  const fetchUsers = () => {
    fetch("http://localhost:3001/get-data")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setSignedUpNames(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePairUsers = () => {
    fetch("http://localhost:3001/pair-users", { method: "POST" })
      .then(() => {
        toast.success("Users paired successfully!", toastOptions);
        fetchUsers(); // Refresh the user list
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error pairing users.", toastOptions);
      });
  };
  useEffect(() => {
    fetchUsers();

    // Exist
    const savedNames = JSON.parse(localStorage.getItem("signedUpNames"));
    if (savedNames) {
      setSignedUpNames(savedNames);
    }
    // let music = new Audio(musicFile);
    // music
    //   .play()
    //   .then(() => console.log("Music playback started"))
    //   .catch((error) => console.error("Error playing music:", error));
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
      // if (music) {
      //   music.pause();
      //   music.currentTime = 0;
      treeAnim.destroy();
      fireAnim.destroy();
      // }
    };
  }, []);

  const renderGiftBoxes = () => {
    const giftBoxImages = [
      "/GiftBox1.svg",
      "/GiftBox2.svg",
      "/GiftBox3.svg",
      "/GiftBox4.svg",
    ];

    return (
      <div className="gift-box-wrapper">
        {signedUpNames.map((item, index) => {
          const giftBoxImage = giftBoxImages[index % giftBoxImages.length];
          return (
            <div key={index} className="gift-box">
              <img src={giftBoxImage} alt="Gift Box" />
              <span className="tooltip">{item.name}</span>
            </div>
          );
        })}
      </div>
    );
  };
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
      .then(() => {
        toast.success(
          `🎉 Yay! Thanks, ${name}! Your preferences have been saved!`,
          toastOptions
        );
        handleClose(); // Close the modal after submission
        fetchUsers(); // Fetch updated users list
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
      <h1 style={{ fontSize: "4em", fontWeight: "bold", marginBottom: "20px" }}>
        A&M Christmas Pixie
      </h1>
      {/* <IconButton
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        style={{
          position: "fixed", // Fixed position
          right: 10, // 10px from the right
          bottom: 10, // 10px from the bottom
          color: "gray", // Icon color
          backgroundColor: "transparent", // Transparent background
        }}
        size="small" // Small size
      >
      </IconButton> */}
      <Button
        variant="contained"
        onClick={handleOpen}
        style={{
          fontSize: "1em", // Smaller font size
          backgroundColor: "#ff8a00", // Sunset-like lighter orange background
          color: "white", // White text for contrast
          padding: "8px 15px", // Smaller padding for a more compact look
          borderRadius: "5px", // Slightly rounded corners
          boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          textTransform: "none", // Removes uppercase styling
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#ff9f40", // A slightly brighter orange on hover
          },
        }}
      >
        Join
      </Button>

      <div className="countdown-timer">
        <Countdown targetDate={new Date("December 29, 2023 23:59:59")} />
      </div>
      <div className="christmas-scene">
        <div ref={treeRef} className="christmas-tree"></div>
        {renderGiftBoxes()}
      </div>
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
