const express = require('express');
const { blogValidation } = require('./../validations');
const validate = require('./../middlewares/validate');
const { blogController } = require('./../controllers');

const router = express.Router();
router.get('/blogs', blogController.getBlogs);
router.post(
  '/blog',
  validate(blogValidation.createBlogSchema),
  blogController.createBlog
);

module.exports = router;
