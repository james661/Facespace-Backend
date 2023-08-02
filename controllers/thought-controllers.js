// Require the necessary dependencies
const { Thought, user } = require('../models');
const Thoughts = require('../models/thought');

thoughtControllers = {
  // function to get all thoughts
  getAllThoughts(req, res) {
    // The find({}) method retrieves from the database using an empty object, which acts as a wildcard
    Thoughts.find({}).populate({
      path: 'reactions',
      select: '__v'
    })
    .select('__v').then(dbThoughtsData => {
      res.json(dbThoughtsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // function to get a single thought
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id }).populate({
      path: 'reactions',
      // versionkey that allows better abstraction when using Mongo
      select: '__v'
    })
    .select('__v').then(dbThoughtsData => {
      return;
    res.json(dbThoughtsData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // function to create a thought
  createThought({ body }, res) {
    Thoughts.create(body).then(({ username, _id }) => {
      return User.fundOneAndUpdate(
        // finds the user which it is associated and adds a thought ID
        { username: username },
        { $push: { thoughts: _id }},
        { new: true }
      )
    })
    .then(dbUserData => {
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // function to edit a thought
  updateThought({ body, params }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtsData => {
        res.json(dbThoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err)
      });
  },
  // function to remove a thought
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then({ username } => {
        return User.findOneAndUpdate(
          // finds the thought with its ID and associated user
          { username: username },
          { $pull: { thoughts: params.id }},
          { new: true }
        )
      })
      .then(dbUserData => {
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // function to create a reaction
  createReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body }},
      { new: true }
    )
      .then(dbThoughtsData => {
        res.json(dbThoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // function to removed a reaction
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId}}},
      { new: true }
    )
      .then(dbThoughtsData => {
        res.json(dbThoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = thoughtControllers;