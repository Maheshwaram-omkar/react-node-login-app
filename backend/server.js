const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many login attempts. Please try again later." },
});

app.post("/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    return res.status(200).json({
      message: "Login successful",
      username,
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
