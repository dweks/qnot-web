const express = require("express");
const {
  getNotesBySearch,
  getNotesByGather,
  getNotesByRecent,
  deleteNotes,
  createNote,
  updateNote,
} = require("../controllers/noteController");
const Note = require("../models/noteModel");

const router = express.Router();

// Getting
router.get("/gather", getNotesByGather);
router.get("/search", getNotesBySearch);
router.get("/last", getNotesByRecent);

// POST
router.post("/", createNote);

// DELETE
router.delete("/delete", deleteNotes);

// UPDATE
router.patch("/:id", updateNote);

module.exports = router;
