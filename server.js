const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/user");
const User2 = require("./models/user2");
const ejs = require("ejs");
const port = process.env.PORT || 8000;
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();
var cookies = require("cookie-parser");
const Auth = require("./middleware/auth");

mongoose.connect("mongodb://localhost:27017/login-app-db2", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8000/",
    credentials: "true",
  })
);

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "/views", "signup"));
});

//teacher signup i made
app.get("/teachersignup", (req, res) => {
  res.render(path.join(__dirname, "/views", "TeacherSignUp"));
});

const publicDirectoryPath = path.join(__dirname, "/views");
const staticDirectory = express.static(publicDirectoryPath);
app.use(staticDirectory);

app.post("/api/register", async (req, res) => {
  const {
    firstname,
    lastname,
    role,
    email,
    password: plainTextPassword,
  } = req.body;
  if (!firstname || typeof firstname !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!lastname || typeof lastname !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (!role || typeof role !== "string") {
    return res.json({ status: "error", error: "Role must be choosen" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      firstname,
      lastname,
      email,
      role,
      password,
    });
    //console.log('User created successfully: ', response)
  } catch (error) {
    if (error.code === 11000) {
      console.log("hello");
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

// remove
app.post("/api/register2", async (req, res) => {
  const {
    firstname,
    lastname,
    role,
    email,
    password: plainTextPassword,
  } = req.body;
  if (!firstname || typeof firstname !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!lastname || typeof lastname !== "string") {
    return res.json({ status: "error", error: "Invalid username" });
  }

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Invalid email" });
  }

  if (!plainTextPassword || typeof plainTextPassword !== "string") {
    return res.json({ status: "error", error: "Invalid password" });
  }
  if (!role || typeof role !== "string") {
    return res.json({ status: "error", error: "Role must be choosen" });
  }

  if (plainTextPassword.length < 5) {
    return res.json({
      status: "error",
      error: "Password too small. Should be atleast 6 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User2.create({
      firstname,
      lastname,
      email,
      role,
      password,
    });
    //console.log('User created successfully: ', response)
  } catch (error) {
    if (error.code === 11000) {
      console.log("hello");
      // duplicate key
      return res.json({ status: "error", error: "Username already in use" });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

// login
app.get("/login", (req, res) => {
  res.render(path.join(__dirname, "/views", "index"));
});

// teacherlogin
app.get("/teacherlogin", (req, res) => {
  res.render(path.join(__dirname, "/views", "teacherlogin"));
});

//Post login route

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send({ error: "enter all the enteries" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.send({ error: "user is not exist please signup first" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.send({ error: "invalid credidentials" });
      } else {
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_JWT);
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true,
            maxAge: 1 * 24 * 60 * 60,
          })
          .send({ message: "successfully Logged In", role: user.role });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// remove

app.post("/teacherlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.send({ error: "enter all the enteries" });
    }
    const user = await User2.findOne({ email });

    if (!user) {
      res.send({ error: "user is not exist please signup first" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.send({ error: "invalid credidentials" });
      } else {
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_JWT);
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true,
            maxAge: 1 * 24 * 60 * 60,
          })
          .send({ message: "successfully Logged In", role: user.role });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// student homepage authriztion route

app.get("/studenthomepage", Auth, (req, res) => {
  res.render(path.join(__dirname, "/views", "StudentHomePage"));
});

// teacher homepage authriztion route

app.get("/teacherhomepage", Auth, (req, res) => {
  res.render(path.join(__dirname, "/views", "TeacherHomePage"));
});
//admin , i added new
app.get("/adminhomepage", (req, res) => {
  res.render(path.join(__dirname, "/views", "AdminHomePage"));
});

// logout
//not sure if i changed somthing accidentally
app.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

// all data of database for admin use

app.get("/allData", async (req, res) => {
  const data = await User.find();
  res.status(200).send({ data });
});

app.listen(port, () => {
  console.log(`Server up at ${port}`);
});
