require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const authRouter = require("./routes/auth");
const postRouter = require('./routes/post');
const mongooseDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)

    console.log("MongoDB Connected");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

mongooseDB();

const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
