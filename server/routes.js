const express = require("express");
const {
  getNote,
  getNotesBySearch,
  getNotesByGather,
  getNotesByRecent,
  getNotesBySticky,
  deleteNotes,
  createNote,
  toggleSticky,
} = require("./noteController");
const { createTag, getTags, getAllTags } = require("./tagController");

const router = express.Router();

// Getting
router.get("/test/:id", getNote);
router.get("/gather", getNotesByGather);
router.get("/search", getNotesBySearch);
router.get("/last", getNotesByRecent);
router.get("/sticky", getNotesBySticky);
router.get("/tags", getTags);
router.get("/tags/all", getAllTags);

// POST
router.post("/", createNote);
router.post("/tags", createTag);

// DELETE
router.delete("/delete", deleteNotes);

// UPDATE
router.patch("/sticky/:id", toggleSticky);

module.exports = router;
