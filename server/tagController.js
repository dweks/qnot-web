const noteModel = require("./noteModel");
const Tag = require("./tagModel");

const createTag = async (req, res) => {
  const tagDocs = req.body.map((t) => {
    return new Tag({ tag: t });
  });
  try {
    const tag = await Tag.insertMany(tagDocs, {
      ordered: false,
    });
    res.status(200).json(tag);
  } catch (error) {
    res.status(200).json(error.insertedDocs);
  }
};

const getTags = async (req, res) => {
  const tags = await Tag.find({ tag: { $in: JSON.parse(req.query.tags) } });
  if (!tags) {
    return res.status(404).json({ error: "No tags found" });
  }
  res.status(200).json(tags);
};

module.exports = {
  createTag,
  getTags,
};
