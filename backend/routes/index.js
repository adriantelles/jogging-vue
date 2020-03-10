const express = require('express');
const expressJwt = require('express-jwt');
const config = require('../config');

const authRoute = require('./auth.route');
const router = express.Router();

router.use('/auth', authRoute);

module.exports = router;
