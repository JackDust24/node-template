const fs = require('fs');
const httpStatus = require('http-status');
const sharp = require('sharp');

const { Blog } = require('../models');
const ApiError = require('../utils/ApiError');
const { ImageProcessor } = require('../background-tasks');
const { CacheProcessor } = require('../background-tasks');
const redisClient = require('../config/redis');

const createBlog = async (body, userId) => {
  await redisClient.del('recent-blogs');
  await Blog.create({ ...body, createdBy: userId });
};

const searchBlogs = async (searchQuery) => {
  const blogs = await Blog.find({ $text: { $search: searchQuery } });
  return blogs;
};

const getRecentBlogs = async () => {
  const blogs = await Blog.find()
    .sort({
      createdAt: -1,
    })
    .limit(10);
  await CacheProcessor.Queue.add('CacheJob', { blogs });
  return blogs;
};

const getReadableFileStream = async (filename) => {
  const filePath = `${__dirname}/../../uploads/${filename}`;
  if (!fs.existsSync(filePath)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  const stream = fs.createReadStream(filePath);
  return stream;
};

const uploadFile = async (file) => {
  const filename = `image-${Date.now()}.webp`;
  const outputPath = `${__dirname}/../../uploads/${filename}`;
  await ImageProcessor.Queue.add('ImageProcessorJob', {
    filename,
    file: file,
  });
  sharp(file.buffer).resize(600).webp({ quality: 80 }).toFile(outputPath);
  return filename;
};

module.exports = {
  createBlog,
  getReadableFileStream,
  uploadFile,
  searchBlogs,
  getRecentBlogs,
};
