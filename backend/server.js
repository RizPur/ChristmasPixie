const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const mongoDBAtlasUri =
  "mongodb+srv://admin:admin@pixiecluster.csz2lzm.mongodb.net/pixiegifts";

mongoose
  .connect(mongoDBAtlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas..."))
  .catch((err) => console.error("Could not connect to MongoDB Atlas...", err));

// Define a Mongoose schema and model for User
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  likes: [String],
  pairedWith: mongoose.Schema.Types.ObjectId,
});

const User = mongoose.model("User", userSchema);

// Shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Pair users function
const pairUsers = async () => {
  try {
    let users = await User.find({ pairedWith: null });
    users = shuffleArray(users); // Shuffle users
    for (let i = 0; i < users.length; i += 2) {
      if (users[i + 1]) {
        users[i].pairedWith = users[i + 1]._id;
        users[i + 1].pairedWith = users[i]._id;
        await users[i].save();
        await users[i + 1].save();
      }
    }
  } catch (err) {
    console.error("Pairing error:", err);
  }
};

const nodemailer = require("nodemailer");

const welcomeEmailTemplate = (name) => `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; }
      .header { background-color: #f2f2f2; padding: 10px; text-align: center; }
      .content { padding: 20px; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Welcome to Pixie Gifting!</h1>
    </div>
    <div class="content">
      <p>Hello ${name},</p>
      <p>Welcome to our Pixie Gifting community! We're excited to have you on board.</p>
    </div>
  </body>
  </html>
  `;

const pairingEmailTemplate = (userName, pairedUserName) => `
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; }
      .header { background-color: #f2f2f2; padding: 10px; text-align: center; }
      .content { padding: 20px; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Your Pixie Match!</h1>
    </div>
    <div class="content">
      <p>Hello ${userName},</p>
      <p>You have been paired with ${pairedUserName} in our Pixie Gifting community!</p>
    </div>
  </body>
  </html>
  `;
const sendEmail = async (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pixiegift876@gmail.com",
      pass: "pnmo laqs vyzd uqym",
    },
  });

  let info = await transporter.sendMail({
    from: '"Pixie App" <pixiegift876@gmail.com>',
    to: to,
    subject: subject,
    html: html, // Changed from text to html
  });

  console.log("Email sent: %s", info.messageId);
};

const pairUsersAndNotify = async () => {
  try {
    let users = await User.find({ pairedWith: null });
    // Shuffle and pair logic
    for (let i = 0; i < users.length; i += 2) {
      if (users[i + 1]) {
        users[i].pairedWith = users[i + 1]._id;
        users[i + 1].pairedWith = users[i]._id;
        await users[i].save();
        await users[i + 1].save();

        // Send email to both users about their match
        sendEmail(
          users[i].email,
          "Your Pixie Match",
          pairingEmailTemplate(users[i].name, users[i + 1].name)
        );
        sendEmail(
          users[i + 1].email,
          "Your Pixie Match",
          pairingEmailTemplate(users[i + 1].name, users[i].name)
        );
      }
    }
  } catch (err) {
    console.error("Pairing error:", err);
  }
};
// Fetch all users
app.get("/get-data", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error fetching data");
  }
});

// Add a new user
app.post("/submit-form", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();

    // Send welcome email
    sendEmail(
      user.email,
      "Welcome to Pixie Gifting!",
      welcomeEmailTemplate(user.name)
    );

    res.send("Data saved successfully");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error saving data");
  }
});

// Pair users endpoint
app.post("/pair-users", async (req, res) => {
  try {
    await pairUsersAndNotify();
    res.send("Users paired and notified successfully.");
  } catch (err) {
    console.error("Error pairing users:", err);
    res.status(500).send("Error pairing users.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
