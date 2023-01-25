const express = require("express");
const {
  getNote,
  getNotesBySearch,
  getNotesByGather,
  getNotesByRecent,
  deleteNotes,
  createNote,
  toggleSticky,
} = require("../controllers/noteController");
const Note = require("../models/noteModel");

const router = express.Router();

// Getting
router.get("/test/:id", getNote)
router.get("/gather", getNotesByGather);
router.get("/search", getNotesBySearch);
router.get("/last", getNotesByRecent);

// POST
router.post("/", createNote);

// DELETE
router.delete("/delete", deleteNotes);

// UPDATE
router.patch("/sticky/:id", toggleSticky);

module.exports = router;
