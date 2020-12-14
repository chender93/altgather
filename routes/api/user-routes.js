const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  createFriend,
  updateUser,
  deleteUser,
  deleteFriend
} = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//Friend routes
  router.route('/:userId/friends/:friendId')
  .post(createFriend)
  .delete(deleteFriend);


module.exports = router;
