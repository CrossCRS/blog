const postController = require('../controllers/post.controller');
const userController = require('../controllers/user.controller');

module.exports = (app) => {
  // Posts
  app.route('/api/posts')
    .get(postController.get_all_posts);
  app.route('/api/posts/:postId')
    .get(postController.get_post_by_id);

  // Users
  app.route('/api/users/:username')
    .get(userController.get_user_by_username);
  app.route('/api/users/:username/posts')
    .get(postController.get_posts_by_username);
};
