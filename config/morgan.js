const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Define token for morgan
morgan.token('message', (req, res) => res.locals.errorMessage || '');

// Define morgan format
const getIPFormat = () =>
  config.env === 'production' ? ':remote-addr - ' : '';

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', 'logs/access.log'),
  { flags: 'a' }
);

// Define morgan success logger
const successResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date`;
const successHandler = morgan(successResponseFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400,
});

// Define morgan error logger
const errorResponseFormat = `${getIPFormat()} :method :url :status :response-time ms :user-agent :date - error-message: :message`;
const errorHandler = morgan(errorResponseFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
});

module.exports = { successHandler, errorHandler };
