const { genSalt, hash } = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/userModel');
const {
  ALLOWED_PARAMS_FOR_CREATE_USER,
  ALLOWED_PARAMS_FOR_SEARCH,
  KEYS_TO_SPLIT_TO_ARRAYS_SET,
} = require('../utils/constants');

const SELECT_FIELDS = '-__v -_id -createdAt -email -passwordDigest -updatedAt';
const CREATE_USER_ERROR_MESSAGE =
  'Could not create user. Please check all fields.';

const sanitizeParamsForCreateUser = (req, res, next) => {
  console.log(
    '[usersController][sanitizeParamsForCreateUser] Starting sanitizeParamsForCreateUser.'
  );
  const { body } = req;

  res.locals.userInfo = ALLOWED_PARAMS_FOR_CREATE_USER.reduce(
    (userInfo, param) => {
      const val = body[param];

      if (val) {
        if (KEYS_TO_SPLIT_TO_ARRAYS_SET.has(param)) {
          userInfo[param] = val.split(',');
        } else {
          userInfo[param] = val;
        }
      }

      return userInfo;
    },
    {}
  );

  console.log(
    '[usersController][sanitizeParamsForCreateUser] Ending sanitizeParamsForCreateUser.'
  );
  next();
};

const validateEmail = async (_, res, next) => {
  console.log('[usersController][validateEmail] Starting validateEmail.');
  const { email } = res.locals.userInfo;

  try {
    const possibleUser = await User.findOne({ email });

    if (possibleUser) {
      return next({
        log: `[usersController][validateEmail] Error creating a user; email ${email} is taken.`,
        message: CREATE_USER_ERROR_MESSAGE,
        status: 400, // Find right status code?
      });
    }
  } catch (e) {
    return next({
      log: '[usersController][validateEmail] Error creating a user. Something happened while checking the database for email uniqueness.',
      message: CREATE_USER_ERROR_MESSAGE,
      status: 400, // Find right status code?
    });
  }

  const emailSections = email.split('@');
  const [emailSection1, emailSection2] = emailSections;
  let isEmailValid =
    emailSections.length === 2 && emailSection1 && emailSection2;

  if (isEmailValid) {
    const domainSections = emailSections[1].split('.');
    isEmailValid =
      domainSections.length > 1 && domainSections.every((val) => val);
  }

  if (!isEmailValid) {
    return next({
      log: `[usersController][validateEmail] Error creating a user; email ${email} is not valid.`,
      message: CREATE_USER_ERROR_MESSAGE,
      status: 400, // Find right status code?
    });
  }

  console.log('[usersController][validateEmail] Ending validateEmail.');
  next();
};

// There's probably a standardized library that does this better.
// need to check if a number is present, etc.
// check against bad password list.
const validatePassword = (_, res, next) => {
  console.log('[usersController][validatePassword] Starting validatePassword.');
  const { password } = res.locals.userInfo;

  if (password.length < 8) {
    return next({
      log: `[usersController][validatePassword] Password for user ${username} is not long enough.`,
      message: CREATE_USER_ERROR_MESSAGE,
      status: 400, // Find right status code?
    });
  }

  console.log('[usersController][validatePassword] Ending validatePassword.');
  next();
};

const createUser = async (_, res, next) => {
  console.log('[usersController][createUser] Starting createUser.');

  const { userInfo } = res.locals;
  const { password } = userInfo;
  let id = uuidv4();

  try {
    let possibleUser = await User.findOne({ id });

    while (possibleUser) {
      id = uuidv4();
      possibleUser = await User.findOne({ id });
    }

    userInfo.id = id;
    const salt = await genSalt(10);
    userInfo.passwordDigest = await hash(password, salt);
    res.locals.user = await User.create(userInfo);
    console.log(`[usersController][createUser] Created user ${id}.`);
  } catch (e) {
    return next({
      message: CREATE_USER_ERROR_MESSAGE,
      log: `[usersController][createUser] Error caught in createUser. \n${e}`,
      status: 400, // TODO: Find right status code
    });
  }

  console.log('[usersController][createUser] Ending createUser.');
  next();
};

const stripSensitiveInformationFromUser = (_, res, next) => {
  console.log(
    '[usersController][stripSensitiveInformationFromUser] Starting stripSensitiveInformationFromUser.'
  );

  const {
    id,
    name,
    location,
    description,
    genres,
    instruments,
    seeking,
    imageSrcs,
    skillLevel,
    influences,
  } = res.locals.user;

  res.locals.user = {
    id,
    name,
    location,
    description,
    genres,
    instruments,
    seeking,
    imageSrcs,
    skillLevel,
    influences,
  };

  console.log(
    '[usersController][stripSensitiveInformationFromUser] Ending stripSensitiveInformationFromUser.'
  );
  next();
};

const getUser = async (req, res, next) => {
  console.log('[usersController][getUser] Starting getUser.');
  const { id } = req.params;
  console.log(
    `[usersController][getUser] Getting user info for user with ID ${id}`
  );

  try {
    const user = await User.findOne({ id }).select(SELECT_FIELDS);
    res.locals.user = user;
    console.log(`[usersController][getUser] Got user ${id}.`);
  } catch (e) {
    return next({
      message: 'Unable to find user.',
      log: `[usersController][getUser] Express error handler caught in getUser. \n${e}`,
      status: 400,
    });
  }

  console.log('[usersController][getUser] Ending getUser.');
  next();
};

const sanitizeParamsForSearch = (req, res, next) => {
  console.log(
    '[usersController][sanitizeParamsForSearch] Starting sanitizeParamsForSearch'
  );
  const { query } = req;
  let hasAtleastOneParam = false;

  res.locals.searchParams = ALLOWED_PARAMS_FOR_SEARCH.reduce((acc, param) => {
    const val = query[param];

    if (val) {
      if (!hasAtleastOneParam) hasAtleastOneParam = true;
      const splitVals = val.split(',');
      if (splitVals.length) acc[param] = { $in: splitVals };
    }

    return acc;
  }, {});

  if (!hasAtleastOneParam) {
    return next({
      message: 'Please add some search details.',
      log: '[usersController][sanitizeParamsForSearch] No search params were provided.',
      status: 400,
    });
  }

  res.locals.skip = query.skip;
  console.log(
    '[usersController][sanitizeParamsForSearch] Ending sanitizeParamsForSearch.'
  );
  next();
};

// I'm not fully sure this actually works; debug further once FE is working.
const getUsers = async (_, res, next) => {
  console.log('[usersController][getUsers] Starting getUsers.');
  const { searchParams, skip } = res.locals;

  try {
    res.locals.users = await User.find(searchParams)
      .skip(skip)
      .limit(25)
      .select(SELECT_FIELDS);
  } catch (e) {
    return next({
      message: 'Unable to find users.',
      log: `[usersController][getUsers] Express error handler caught in getUsers. \n${e}`,
      status: 400,
    });
  }

  console.log('[usersController][getUsers] Ending usersController.getUsers.');
  next();
};

const updateUser = async (req, res, next) => {
  console.log('[usersController][updateUser] Starting updateUser.');
  const { id } = req.params;
  console.log(`[usersController][updateUser] User to be updated: ${id}.`);
  const { userInfo } = res.locals;

  try {
    res.locals.user = await User.findOneAndUpdate({ id }, userInfo, {
      new: true,
    }).select(SELECT_FIELDS);
    console.log(`[usersController][updateUser] User ${id} updated.`);
  } catch (e) {
    return next({
      message: 'Unable to update user.',
      log: `[usersController][updateUser] Express error handler caught in updateUser. \n${e}.`,
      status: 400,
    });
  }

  console.log('[usersController][updateUser] Ending updateUser.');
  next();
};

const deleteUser = async (req, _, next) => {
  console.log('[usersController][deleteUser] Starting deleteUser.');
  const { id } = req.params;
  console.log(`[usersController][deleteUser] User to be deleted: ${id}.`);

  try {
    await User.deleteOne({ id });
    console.log(`[usersController][deleteUser] User ${id} deleted.`);
  } catch (e) {
    return next({
      message: 'Unable to delete user.',
      log: `[usersController][deleteUser] Express error handler caught in getUsers. \n${e}.`,
      status: 400,
    });
  }

  console.log('[usersController][deleteUser] Ending deleteUser.');
  next();
};

module.exports = {
  sanitizeParamsForCreateUser,
  validateEmail,
  validatePassword,
  createUser,
  stripSensitiveInformationFromUser,
  getUser,
  sanitizeParamsForSearch,
  getUsers,
  updateUser,
  deleteUser,
};
