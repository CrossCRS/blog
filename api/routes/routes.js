const postController = require('../controllers/post.controller');
const userController = require('../controllers/user.controller');

module.exports = (app) => {
  // Posts
  app.route('/api/posts')
    .get(postController.get_all_posts);

  // Post
  app.route('/api/post/:postId')
    .get(postController.get_post_by_id);
};
