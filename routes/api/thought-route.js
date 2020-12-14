const router = require('express').Router();
const {
    allThoughts,
    justOneThought,
    addThought,
    addReaction,
    updateThought,
    removeThought,
    removeReaction
} = require('../../controllers/thought-controller');

// Thought routes to GET all Thoughts and POST a Thought
router.route('/').get(allThoughts).post(addThought);

// Thought routes to GET one Thought, PUT an updated Thought and DELETE a Thought
router.route('/:id').get(justOneThought).put(updateThought).delete(removeThought);

// POST to create a reaction
// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE to remove one reaction from a thought
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;