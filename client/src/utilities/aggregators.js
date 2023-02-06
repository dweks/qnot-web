export function gatherTagIds(tags) {
  return tags.map((tag) => {
    return tag._id;
  });
}
