const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;