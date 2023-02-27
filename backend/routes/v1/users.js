const { Router } = require('express');

const {
  sanitizeParamsForCreateUser,
  validateEmail,
  validatePassword,
  sanitizeParamsForSearch,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  stripSensitiveInformationFromUser,
} = require('../../controllers/usersController');

const router = Router();

router.post(
  '/',
  (req, res, next) => {
    console.log('[Route] POST request to /api/v1/users');
    next();
  },
  sanitizeParamsForCreateUser,
  validateEmail,
  validatePassword,
  createUser,
  stripSensitiveInformationFromUser,
  (_, res) => res.status(202).send(res.locals.user)
);

router.get(
  '/',
  (req, res, next) => {
    console.log('[Route] GET request to /api/v1/users');
    next();
  },
  sanitizeParamsForSearch,
  getUsers,
  (_, res) => res.status(200).send(res.locals.users)
);

router.get(
  '/:id',
  (req, res, next) => {
    console.log('[Route] GET request to /api/v1/users/:id');
    next();
  },
  getUser,
  (_, res) => res.status(200).send(res.locals.user)
);

router.patch(
  '/:id',
  (req, res, next) => {
    console.log('[Route] PATCH request to /api/v1/users/:id');
    next();
  },
  sanitizeParamsForCreateUser,
  updateUser,
  (_, res) => res.status(200).send(res.locals.user)
);

router.delete(
  '/:id',
  (req, res, next) => {
    console.log('[Route] DELETE request to /api/v1/users/:id');
    next();
  },
  deleteUser,
  (_, res) => res.sendStatus(204)
);

module.exports = router;
