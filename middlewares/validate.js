const joi = require('joi');
const ApiError = require('./../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const keys = Object.keys(schema);
  const object = keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      acc[key] = req[key];
    }
    return acc;
  }, {});
  const { value, error } = joi.compile(schema).validate(object);
  if (error) {
    const errors = error.details.map((detail) => detail.message.join(','));
    next(new ApiError(400, errors));
  }
  return next();
};

module.exports = validate;
