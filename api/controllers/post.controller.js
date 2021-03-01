const createError = require('http-errors');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const DEFAULT_ITEMS_PER_PAGE = 5;

exports.get_all_posts = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || DEFAULT_ITEMS_PER_PAGE;
  const skip = parseInt(req.query.skip, 10) || 0;

  Post.find({})
    .sort('-posted_at')
    .skip(skip)
    .limit(limit)
    .populate({ path: 'author_id', select: 'username display_name' })
    .then((posts) => {
      Post.estimatedDocumentCount().then((number) => {
        const resp = {
          size: number, // Total posts count
          next: (skip + limit < number) ? `${req._parsedUrl.pathname}?skip=${skip + limit}&limit=${limit}` : null, // Next posts page link
          posts, // Posts array
        };
        res.send(resp);
      }).catch(next);
    }).catch(next);
};

exports.get_post_by_id = (req, res, next) => {
  const id = req.params.postId;

  // Return basic 404 on invalid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404, 'Post not found'));
  }

  Post.findById(id)
    .populate({ path: 'author_id', select: 'username display_name' })
    .then((post) => {
      if (post == null) {
        next(createError(404, 'Post not found'));
      }
      res.send(post);
    })
    .catch(next);
};

exports.get_posts_by_username = (req, res, next) => {
  const { username } = req.params;
  const limit = parseInt(req.query.limit, 10) || DEFAULT_ITEMS_PER_PAGE;
  const skip = parseInt(req.query.skip, 10) || 0;

  User.findOne({ username })
    .select('_id')
    .then((user) => {
      if (user == null) {
        next(createError(404, 'User not found'));
      }

      Post.find({ author_id: user._id })
        .sort('-posted_at')
        .skip(skip)
        .limit(limit)
        .populate({ path: 'author_id', select: 'username display_name' })
        .then((posts) => {
          Post.countDocuments({ author_id: user._id }).then((number) => {
            const resp = {
              size: number, // Total posts count
              next: (skip + limit < number) ? `${req._parsedUrl.pathname}?skip=${skip + limit}&limit=${limit}` : null, // Next posts page link
              posts, // Posts array
            };
            res.send(resp);
          }).catch(next);
        }).catch(next);
    }).catch(next);
};

exports.add_post = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(422, 'Invalid payload'));
  }

  const { title, content } = req.body;

  Post.create({ title, content, author_id: req.user._id })
    .then((post) => {
      res.send(post);
    }).catch((next));
};

exports.update_post = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(422, 'Invalid payload'));
  }

  const id = req.params.postId;

  // Return basic 404 on invalid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404, 'Post not found'));
  }

  const update = {};

  if (req.body.title) update.title = req.body.title;
  if (req.body.content) update.content = req.body.content;

  Post.findByIdAndUpdate(id, update, { new: true }) // Set new to true so that the returned document is the modified document
    .then((post) => {
      res.send(post);
    }).catch(next);
};

exports.delete_post = (req, res, next) => {
  const id = req.params.postId;

  // Return basic 404 on invalid id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404, 'Post not found'));
  }

  Post.findByIdAndDelete(id)
    .then(() => {
      res.send({ message: 'Post deleted' });
    }).catch(next);
};

exports.validate = (method) => {
  switch (method) {
    case 'add_post': {
      return [
        body('title').exists().isString(),
        body('content').exists().isString(),
      ];
    }
    case 'update_post': {
      return [
        body('title').optional().isString(),
        body('content').optional().isString(),
      ];
    }
  }
  return [];
};
