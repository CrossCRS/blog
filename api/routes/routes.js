const loginController = require('../controllers/login.controller');
const pageController = require('../controllers/page.controller');
const postController = require('../controllers/post.controller');
const userController = require('../controllers/user.controller');

module.exports = (app) => {
  // Login
  app.route('/api/login')
    .post(loginController.login);

  // Pages
  app.route('/api/pages')
    .get(pageController.get_all_pages);
  app.route('/api/pages/:name')
    .get(pageController.get_page_by_name);

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
