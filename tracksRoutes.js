const express = require("express");
const database = require("./database");

const router = express.Router();

// Get all tracks
router.get("/api/tracks", async (req, res) => {
  try {
    const [tracks] = await database.query("SELECT * FROM tracks");
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tracks" });
  }
});

// Create a new track and assign to an album
router.post("/api/tracks", async (req, res) => {
  try {
    const { title, duration, album_id } = req.body;
    const result = await database.execute(
      "INSERT INTO tracks (title, duration, album_id) VALUES (?, ?, ?)",
      [title, duration, album_id]
    );
    res.status(201).json({ message: "Track created successfully", insertedId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating track" });
  }
});

// Get tracks from a specific album
router.get("/api/albums/:albumId/tracks", async (req, res) => {
  const albumId = req.params.albumId;
  try {
    const [tracks] = await database.query("SELECT * FROM tracks WHERE album_id = ?", [albumId]);
    res.json(tracks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tracks" });
  }
});

// Modify a track
router.put("/api/tracks/:id", async (req, res) => {
  const trackId = req.params.id;
  const { title, duration } = req.body;
  try {
    await database.execute("UPDATE tracks SET title = ?, duration = ? WHERE id = ?", [title, duration, trackId]);
    res.json({ message: "Track updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating track" });
  }
});

// Delete a track
router.delete("/api/tracks/:id", async (req, res) => {
  const trackId = req.params.id;
  try {
    await database.execute("DELETE FROM tracks WHERE id = ?", [trackId]);
    res.json({ message: "Track deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting track" });
  }
});

module.exports = router;
