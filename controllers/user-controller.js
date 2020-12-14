const { User } = require('../models');

const userController = {
    // GET all Users
    getAllUser(req, res) {
        User.find({})
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET a single user by its _id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .select('-__v')
            .sort({ createdAt: 'desc' })
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID.' });
                    return;
                }
                res.json(userData);
            });
    },

    // POST a new user 
    createUser({ body }, res) {
        User.create(body)
            .then(userData => {
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // PUT to update a User by its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID.' });
                    return;
                }
                res.json({ message: 'The user was updated.', userData });
            })
            .catch(err => res.status(400).json(err));
    },



    // delete to remove User by its _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID.' });
                }
                return Thought.deleteMany(
                    { username: userData.username },
                    { new: true, runValidators: true }
                )
                    .then(thoughtData => {
                        res.json({ message: `This user has been deleted.`, userData, thoughtData });
                    });
            })
            .catch(err => res.status(400).json(err));
    },

    // POST to add a new friend to a user's friend list
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .select('-__v')
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: 'No user found with that ID.' });
                    return;
                }
                res.json({ message: `The user was added to your friend list.`, userData });
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: { _id: params.friendId } } },
            { new: true }
        )
            .then(dbFriendData => res.json(dbFriendData))
            .catch(err => res.json(err));
    }
}




module.exports = userController;