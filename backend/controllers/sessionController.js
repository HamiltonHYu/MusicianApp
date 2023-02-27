const { compare } = require('bcrypt');

const User = require('../models/userModel');

const LOGIN_ERROR_MESSAGE =
  'Could not login. Please check your email and password.';

const sanitizeParamsForLogin = (req, res, next) => {
  console.log(
    '[sessionController][sanitizeParamsForLogin] Starting sanitizeParamsForLogin.'
  );
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      log: `[sessionController][sanitizeParamsForLogin] Usename and password need to be provided.`,
      message: LOGIN_ERROR_MESSAGE,
      status: 400, // Find right status code?
    });
  }

  res.locals = { email, password };
  console.log(
    '[sessionController][sanitizeParamsForLogin] Ending sanitizeParamsForLogin.'
  );
  next();
};

const checkEmailAndPassword = async (_, res, next) => {
  console.log(
    '[sessionController][checkEmailAndPassword] Starting checkEmailAndPassword.'
  );
  const { email, password } = res.locals;

  try {
    // TODO: does findone throw an error if no email found?
    const user = await User.findOne({ email });
    const doesPasswordMatch = await compare(password, user.passwordDigest);

    if (!doesPasswordMatch) {
      return next({
        log: `[sessionController][checkEmailAndPassword] Error logging in; password for ${email} doesn't match passwordDigest.`,
        message: LOGIN_ERROR_MESSAGE,
        status: 400, // Find right status code?
      });
    }

    res.locals.user = user;
  } catch (e) {
    return next({
      log: `[sessionController][checkEmailAndPassword] ${e}`,
      message: LOGIN_ERROR_MESSAGE,
      status: 400, // Find right status code?
    });
  }

  console.log(
    '[sessionController][checkEmailAndPassword] Ending checkEmailAndPassword.'
  );
  next();
};

module.exports = {
  sanitizeParamsForLogin,
  checkEmailAndPassword,
};
