const { Router } = require('express');

const usersRouter = require('./users');
const sessionRouter = require('./session');

const router = Router();
router.use('/users', usersRouter);
router.use('/session', sessionRouter);

module.exports = router;
