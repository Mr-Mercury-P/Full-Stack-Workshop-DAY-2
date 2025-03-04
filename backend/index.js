const express = require('express');
const app = express();
const cors = require("cors");
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the protected route!", user: req.user });
});

var port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
