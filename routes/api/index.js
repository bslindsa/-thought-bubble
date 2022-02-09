const router = require('express').Router();
const user = require('./userRoutes');
const thoughts = require('./thoughtsRoutes');

router.use = ('/users', user);
router.use = ('/thoughts', thoughts);

module.exports = router;