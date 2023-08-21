const express = require("express");
const database = require("./database");

const router = express.Router();

// Get all albums
router.get("/api/albums", async (req, res) => {
  try {
    const [albums] = await database.query("SELECT * FROM albums");
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching albums" });
  }
});

// Create a new album
router.post("/api/albums", async (req, res) => {
  try {
    const { title, artist, release_year } = req.body;
    const result = await database.execute(
      "INSERT INTO albums (title, artist, release_year) VALUES (?, ?, ?)",
      [title, artist, release_year]
    );
    res.status(201).json({ message: "Album created successfully", insertedId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating album" });
  }
});

// Get an album by ID
router.get("/api/albums/:id", async (req, res) => {
  const albumId = req.params.id;
  try {
    const [album] = await database.query("SELECT * FROM albums WHERE id = ?", [albumId]);
    if (album.length === 0) {
      res.status(404).json({ message: "Album not found" });
    } else {
      res.json(album[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching album" });
  }
});

// Modify an album
router.put("/api/albums/:id", async (req, res) => {
  const albumId = req.params.id;
  const { title, artist, release_year } = req.body;
  try {
    await database.execute(
      "UPDATE albums SET title = ?, artist = ?, release_year = ? WHERE id = ?",
      [title, artist, release_year, albumId]
    );
    res.json({ message: "Album updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating album" });
  }
});

// Delete an album
router.delete("/api/albums/:id", async (req, res) => {
  const albumId = req.params.id;
  try {
    await database.execute("DELETE FROM albums WHERE id = ?", [albumId]);
    res.json({ message: "Album deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting album" });
  }
});

module.exports = router;
