// Description: This file contains the catchAsync function which is used to
// catch errors in async functions and pass them to the error handling middleware.
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next).catch((err) => next(err)));
};

module.exports = catchAsync;
