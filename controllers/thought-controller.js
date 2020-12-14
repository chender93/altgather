const { Thought, User } = require('../models');

// GET to get all thoughts
const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET to a single thought by its _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // POST to create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((_id) => {
                return Thought.findOneAndUpdate(
                    { _id: req.body.id },
                    { $push: { User: thought._id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },



    // PUT to update a thought by its _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },




    // DELETE to remove a  Thought by its _id
    deleteThought({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { thoughts: { thoughtId: params.thoughtId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },


    // POST to create a reaction stored in a single thought's reaction array field
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then(dbReactionData => {
                if (!dbReactionData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbReactionData);
            })
        .catch(err => res.status(400).json(err));
},

    // DELETE to pull and remove a reaction by the reaction's reactionID
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(dbReactionData => {
            if (!dbReactionData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
            }
            res.json(dbReactionData);
        })
    .catch(err => res.status(400).json(err));
    }
}

module.exports = thoughtController;
