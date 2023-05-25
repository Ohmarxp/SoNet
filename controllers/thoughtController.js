const { Thought, User, reactionSchema } = require('../models');

const thoughtController = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get a single thought by its _id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const { thoughtText, username, userId } = req.body;
      const thought = await Thought.create({ thoughtText, username });
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(201).json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Delete a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      await User.findOneAndUpdate(
        {thoughts: req.params.thoughtId},
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      res.json({ message: 'Thought deleted' });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.status(201).json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;