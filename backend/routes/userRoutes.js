const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register user
router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newUser = new User({ fullName, email, password });
    const user = await newUser.save();
    console.log(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add booking
router.post("/book", async (req, res) => {
  const { userId, movieId, movieTitle, state, city, theater, timing, date, Poster} =
    req.body;

  try {
    const user = await User.updateOne(
      { _id: userId },
      {
        $push: {
          bookings: {
            movieId,
            movieTitle,
            state,
            city,
            theater,
            timing,
            date,
            Poster
          },
        },
      }
    );
    console.log("Element added successfully");

    res.status(201).json({ message: "Booking added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
