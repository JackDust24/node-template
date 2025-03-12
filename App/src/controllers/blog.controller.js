const httpStatus = require('http-status');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');
const ApiError = require('../utils/ApiError');

const createBlog = catchAsync(async (req, res) => {
  await blogService.createBlog(req.body);
  res
    .status(httpStatus.CREATED)
    .send({ success: true, message: 'Blog created successfuly' });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getBlogs();
  res.status(httpStatus.OK).json(blogs);
});

const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  res.status(httpStatus.OK).json({ fileName: req.file.filename });
});

const getFile = catchAsync(async (req, res) => {
  const { filename } = req.params;
  const stream = await blogService.getReadableFileStream(filename);
  const contentType = `image/${filename.split('.')[1].toLowerCase()}`;
  res.setHeader('Content-Type', contentType);
  stream.pipe(res);
});

module.exports = {
  createBlog,
  getBlogs,
  uploadFile,
  getFile,
};
