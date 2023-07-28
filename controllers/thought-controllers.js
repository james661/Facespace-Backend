const { Thought, user } = require('../models');
const Thoughts = require('../models/thought');

thoughtControllers = {
  getAllThoughts(req, res) {
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
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id }).populate({
      path: 'reactions',
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
  createThought({ body }, res) {
    Thoughts.create(body).then(({ username, _id }) => {
      return User.fundOneAndUpdate(
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
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then({ username } => {
        return User.findOneAndUpdate(
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