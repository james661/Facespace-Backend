const { User, Thought } = require("../models");

const userControllers = {
  // function to find all users
  getAllUsers(req, res) {
    User.find({})
      .populate({ path: "thoughts", select: "__v" })
      .populate({ path: "friends", select: "__v" })
      .select("__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // function to get a single user
  async getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({ path: "thoughts", select: "__v" })
      .select("v")
      .then(dbUserData.json(dbUserData))

      .catch((err) => {
        return log(err);
        return res.status(500).json(err);
      });
  },
  // function to create a user
  async createUser(req, res) {
    try {
      console.log(req.params);
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // function to change an existing user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, { new: true }, body)
      .then((dbUserData) => {
        return res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // function to remove a user
  deleteUser({ params }, res) {
    User.findByIdAndDelete({ _id: params.id })
      .then((dbUserData) => {
        const deleteThoughtsPromises = dbUserData.thoughts.map((thought) =>
          Thought.findOneAndDelete({ _id: thought })
        );
        Promise.all(deleteThoughtsPromises)
          .then((deletedThoughts) => {
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // function to add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { new: true },
      { $push: { friends: params.friendId } }
    )
      .then((dbUserData) => {
        return res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // function to remove a friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { new: true },
      { $pull: { friends: params.friendId } }
    )
      .then((dbUserData) => {
        return res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
};
// export the controllers
module.exports = userControllers;
