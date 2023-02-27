const { Router } = require('express');

const {
  sanitizeParamsForLogin,
  checkEmailAndPassword,
} = require('../../controllers/sessionController');

const router = Router();

router.post(
  '/',
  (req, res, next) => {
    console.log('[Route] POST request to /api/v1/session');
    next();
  },
  sanitizeParamsForLogin,
  checkEmailAndPassword,
  (_, res) => res.status(202).send(res.locals.user)
);

module.exports = router;
