const mongoose = require('mongoose');
const http = require('http');
const config = require('./config/config');
const app = require('./server');
const logger = require('./config/logger');

// Connnect to MongoDB
mongoose
  .connect(config.dbConnection)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(error);
  });

// Create HTTP server
const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});

// Handle unhandled promise rejections
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unExpectedErrorHandler = (error) => {
  console.error('unExpectedErrorHandler, ', error);
  logger.error(error);
  exitHandler();
};

// Handle unhandled promise rejections
process.on('unhandledRejection', unExpectedErrorHandler);
// Handle uncaught exceptions
process.on('uncaughtException', unExpectedErrorHandler);
// Handle SIGTERM signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM recieved');
  if (server) {
    server.close();
  }
});
