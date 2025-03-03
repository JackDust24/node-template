const express = require('express');
const app = express();
const blogRouter = require('./routes/blog.route');
const authRouter = require('./routes/auth.route');
const { errorHandler, errorConverter } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const morgan = require('./config/morgan');
// Morgan handlers
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express.json());

// Routes
app.use(blogRouter);
app.use(authRouter);

// Error handlers
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
