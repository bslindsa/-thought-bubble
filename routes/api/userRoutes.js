const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

console.log("inside api / users / routes"); 
router.route('/').get(getUsers).post(createUser);

/*
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends/')
    .post(addFriend);

router.route('/:userId/friends/:friendId')
    .delete(deleteFriend);
*/ 
module.exports = router;