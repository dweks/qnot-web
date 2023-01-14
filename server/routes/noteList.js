const express = require("express");
const {
  getNotesBySearch,
  getNotesByGather,
  getNotesByRecent,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const Note = require("../models/noteModel");

const router = express.Router();

// Getting
router.get("/gather", getNotesByGather);
router.get("/search", getNotesBySearch);
router.get("/last", getNotesByRecent);

// POST a new workout
router.post("/", createNote);

// DELETE a workout
router.delete("/:id", deleteNote);

// UPDATE a workout
router.patch("/:id", updateNote);

module.exports = router;
