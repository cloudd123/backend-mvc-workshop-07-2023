// app.js
require("dotenv").config();
const mysql = require("mysql2/promise");
const express = require("express");
const albumsRoutes = require("./albumsRoutes");
const tracksRoutes = require("./tracksRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Use the built-in express.json() middleware for JSON parsing

// Use your albums and tracks routes
app.use(albumsRoutes);
app.use(tracksRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
