const express = require('express');
const expressJwt = require('express-jwt');
const config = require('../config');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const entryRoute = require('./entry.route');
const profileRoute = require('./profile.route');

const router = express.Router();
const authMiddleware = expressJwt({ secret: config.jwtSecret });

router.use('/auth', authRoute);
router.use('/users', authMiddleware, userRoute);
router.use('/entries', authMiddleware, entryRoute);
router.use('/profile', authMiddleware, profileRoute);

module.exports = router;
