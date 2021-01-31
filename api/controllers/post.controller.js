const Post = require('../models/post.model');
const User = require('../models/user.model');

const ITEMS_PER_PAGE = 5;

exports.get_pages_count = (req, res) => {
  Post.estimatedDocumentCount().then((number) => {
    const resp = {
      pages_count: number > 0 ? Math.ceil(number / ITEMS_PER_PAGE) : 1,
      posts_count: number,
    };
    res.send(resp);
  });
};

exports.get_all_posts = (req, res, next) => {
  const page = parseInt(req.params.page, 10) || 1;

  Post.find({})
    .sort('-posted_at')
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .populate({ path: 'author_id', select: 'name' })
    .then((posts) => { res.send(posts); })
    .catch(next);
};

exports.get_post_by_id = (req, res, next) => {
  const id = req.params.postId;

  Post.findById(id)
    .populate({ path: 'author_id', select: 'name' })
    .then((post) => { res.send(post); })
    .catch(next);
};
