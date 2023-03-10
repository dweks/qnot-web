const noteModel = require("./noteModel");
const Tag = require("./tagModel");

const createTag = async (req, res) => {
  try {
    const tags = await Tag.bulkWrite(
      req.body.map((tag) => ({
        updateOne: {
          filter: { tag: tag },
          update: {
            $set: { tag: tag },
            $addToSet: { notes: req.query.noteid },
          },
          upsert: true,
        },
      }))
    );
    res.status(200).json(tags);
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

const getAllTags = async (req, res) => {
  const tags = await Tag.find({});
  if (!tags) {
    return res.status(404).json({ error: "No tags found" });
  }
  res.status(200).json(tags);
};

module.exports = {
  createTag,
  getTags,
  getAllTags,
};
