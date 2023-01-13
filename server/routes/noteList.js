const express = require("express");
const {
  createNote,
  getNote,
  getNotes,
  deleteNote,
  updateNote,
  getNotesBySearch,
} = require("../controllers/noteController");
const Note = require("../models/noteModel");

const router = express.Router();

// gets all workouts
router.get("/", getNotes);

router.get("/search", getNotesBySearch);

// gets SINGLE workouts
router.get("/:id", getNote);

// POST a new workout
router.post("/", createNote);

// DELETE a workout
router.delete("/:id", deleteNote);

// UPDATE a workout
router.patch("/:id", updateNote);

module.exports = router;
