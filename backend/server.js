const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001; // You can choose any port that is free
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

app.post("/submit-form", (req, res) => {
  const data = req.body;
  const filePath = path.join(__dirname, "data.json");

  // Read existing data
  fs.readFile(filePath, (err, fileData) => {
    let json = [];
    if (!err) {
      try {
        json = JSON.parse(fileData.toString() || "[]");
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    }

    // Add new data
    json.push(data);

    // Write updated data back to file
    fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Error writing to file");
      }
      res.send("Data saved successfully");
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
