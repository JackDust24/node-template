const catchAsync = require('./../utils/catchAsync');
const httpStatus = require('http-status');
const { userService } = require('./../services');

// Register a new user by calling catchAsync function which wraps the async function
const register = catchAsync(async (req, res) => {
  // create a user
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
  // generate token
});

module.exports = {
  register,
};
