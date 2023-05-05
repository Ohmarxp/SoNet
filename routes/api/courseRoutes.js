const router = require("express").Router();
const Thought = require("../../models/Thought");
const Reaction = require("../../models/Reaction");

router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.status(200).json(thoughts);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const thoughts = await Thought.findById(req.params.id);
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  try {
    const thought = Thought.create(req.body);
    res.status(200).json(thought);
  } catch {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findByIdAndUpdate(id, req.body);
    if (!thought) {
      return res.status(404).json({ message: "thought not found" });
      //can't find any thought in db
    }
    const updatedthought = await Thought.findById(id);
    res.status(200).json(updatedthought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thought = await Thought.findByIdAndDelete(id);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const reaction = await Reaction.create(req.body);

    const thought = await Thought.findOneAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: reaction } },
      { new: true }
    );
    if (!thought) {
      return res
        .status(400)
        .json({ message: "No reaction found with this ID!!!" });
    }
    res.json(reaction);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Error creating reaction!!!", err });
  }
});

//DELETE /api/thoughts/:thoughtId/reactions/:reactionId
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);

    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    );
    if (!thought) {
      return res
        .status(400)
        .json({ message: "No reaction found with this ID!!!" });
    }
    res.json(reaction);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: "Error deleting reaction!!!", err });
  }
});

module.exports = router;