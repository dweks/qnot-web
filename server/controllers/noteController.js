const Note = require("../models/noteModel");
const mongoose = require("mongoose");

const getNotesBySearch = async (req, res) => {
  try {
    const note = await Note.find({
      // $or: [
      //   { title: new RegExp(".*" + req.query.qry + ".*") },
      //   { body: new RegExp(".*" + req.query.qry + ".*") },
      // ],
      title: new RegExp(".*" + req.query.qry + ".*"),
    }).sort({ createdAt: -1 });

    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getNotesByGather = async (req, res) => {
  try {
    const note = await Note.find({}).sort({ createdAt: -1 });
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getNotesByRecent = async (req, res) => {
  try {
    const note = await Note.find({})
      .limit(req.query.num)
      .sort({ createdAt: -1 });
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

  try {
    const note = await Note.create({ title, body, tags });
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// delete a note
const deleteNotes = async (req, res) => {
  // const { id } = req.params;
  // if (!mongoose.Types.ObjectId.isValid) {
  //   return res.status(404).json({ error: "No such note" });
  // }

  const notes = JSON.parse(req.query.notes);
  const note = await Note.deleteMany({ _id: { $in: notes } });
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
      sticky: toggle,
    }
  );

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

module.exports = {
  getNotesBySearch,
  getNotesByGather,
  getNotesByRecent,
  createNote,
  getNote,
  deleteNotes,
  updateNote,
};
