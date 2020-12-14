const { Thought, User } = require('../models');

const thoughtController = {
  // add thought to user
  addThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'There was an error. Try again!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  //Update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .select('-__v')
        .then(updatedThought => {
            if (!updatedThought) {
                res.status(404).json({ message: 'No Thought found with that ID.' });
                return;
            }
            res.json({ updatedThought });
        })
        .catch(err => res.status(400).json(err));
},
  // add reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, 
      { $push: { reactions: body } }, 
      { new: true })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOneAndUpdate(
          { username: thoughtData.username },
          { $pull: { thoughts: { id: req.params.id} } },
          { new: true, runValidators: true }
        );
      })
      .then(dbUserData => {
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  //Search for all thoughts
  allThoughts(req, res) {
    Thought.find({})
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
  },
  //Search for one Thought
  justOneThought({ params }, res) {
    Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought found with this ID.' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;
