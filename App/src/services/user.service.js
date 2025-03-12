const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const EventEmitter = require('../utils/EventEmitter');

const createUser = async (userBody) => {
  // check if email exists
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
  }

  const user = await User.create(userBody);
  // Event emit - send mail
  EventEmitter.emit('signup', user);
  return user;
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (id) => {
  return await User.findById(id);
};
module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
