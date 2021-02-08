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
          next: (skip + limit < number) ? `${req._parsedUrl.pathname.path}?skip=${skip + limit}&limit=${limit}` : null, // Next posts page link
          posts, // Posts array
        };
        res.send(resp);
      }).catch(next);
    }).catch(next);
};

exports.get_post_by_id = (req, res, next) => {
  const id = req.params.postId;

  Post.findById(id)
    .populate({ path: 'author_id', select: 'username display_name' })
    .then((post) => { res.send(post); })
    .catch(next);
};

exports.get_posts_by_username = (req, res, next) => {
  const { username } = req.params;
  const limit = parseInt(req.query.limit, 10) || DEFAULT_ITEMS_PER_PAGE;
  const skip = parseInt(req.query.skip, 10) || 0;

  User.findOne({ username })
    .select('_id')
    .then((user) => {
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
