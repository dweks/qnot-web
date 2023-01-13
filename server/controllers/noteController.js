const Note = require("../models/noteModel");
const mongoose = require("mongoose");

const getNotesBySearch = async (req, res) => {
  try {
    const note = await Note.find({
      title: req.query.qry,
    }).sort({ createdAt: -1 });

    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const note = await Note.find({}).sort({ createdAt: -1 });
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// get a single note
const getNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }
  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// create new note
const createNote = async (req, res) => {
  const { title, body, tags } = req.body;

  // add doc to db
  try {
    const note = await Note.create({ title, body, tags });
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

module.exports = {
  createNote,
  getNote,
  getNotes,
  deleteNote,
  updateNote,
  getNotesBySearch,
};
