# node-template

This is not a project, but some personal boilerplate code for me to use now and again.

This is **NOT** downloadable or able to use and run.

## Layout
Under App/src:
├── background-tasks
├── config
├── controllers
├── index.js
├── loaders
├── logs
├── middlewares
├── models
├── routes
├── services
├── subscribers
├── utils
└── validations

* background-tasks
  * This is for Redis Queue and Workers. We have a createWorker method to handle different workers.
  * When we upload a file or getBlog we cache first.
* config
  * Here is where we store the env vars config; the loggers for morgan and winston
* controllers
  * It receives HTTP requests, handles them by interacting with the relevant services, and then returns responses to the client.
* loaders
  * for initializing and configuring various parts of the application during startup
* middleware
  * Processes auth requests, errors and validations before requests go through the route handler.
* models
  * The schemas for the blogs and users etc
* routes
  * Handles the routes
* services
  * Encapsulates business logic and database interactions
* subscribers
  * trigerring events for the signup and email
* utils
* validations 
  * Validate the env vars etc