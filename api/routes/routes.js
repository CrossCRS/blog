const auth = require('../middleware/auth.middleware');
const loginController = require('../controllers/login.controller');
const pageController = require('../controllers/page.controller');
const postController = require('../controllers/post.controller');
const userController = require('../controllers/user.controller');

module.exports = (app) => {
  // Login
  app.route('/api/login')
    .post(loginController.validate('login'), loginController.login);

  // Pages
  app.route('/api/pages')
    .get(pageController.get_all_pages);
  app.route('/api/pages/:name')
    .get(pageController.get_page_by_name)
    .put(auth.isAuthenticated, auth.isAdmin, pageController.validate('add_page'), pageController.add_page)
    .patch(auth.isAuthenticated, auth.isAdmin, pageController.validate('update_page'), pageController.update_page)
    .delete(auth.isAuthenticated, auth.isAdmin, pageController.delete_page);

  // Posts
  app.route('/api/posts')
    .get(postController.get_all_posts)
    .post(auth.isAuthenticated, auth.isAdmin, postController.validate('add_post'), postController.add_post);
  app.route('/api/posts/:postId')
    .get(postController.get_post_by_id)
    .patch(auth.isAuthenticated, auth.isAdmin, postController.validate('update_post'), postController.update_post)
    .delete(auth.isAuthenticated, auth.isAdmin, postController.delete_post);

  // Users
  app.route('/api/users/:username')
    .get(userController.get_user_by_username);
  app.route('/api/users/:username/posts')
    .get(postController.get_posts_by_username);
};
