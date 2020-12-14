const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    createReaction,
    updateThought,
    deleteThought,
    deleteReaction
} = require('../../controllers/thought-controller');

// Thought routes to GET all Thoughts and POST a Thought
router.route('/').get(getAllThoughts).post(createThought);

// Thought routes to GET one Thought, PUT an updated Thought and DELETE a Thought
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// POST to create a reaction
// /api/thoughts/:thoughtId/reactions
router.route('/:id/reactions').post(createReaction);

// DELETE to remove one reaction from a thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;