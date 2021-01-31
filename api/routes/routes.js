const postController = require('../controllers/post.controller');

module.exports = (app) => {
  // Posts
  app.route('/api/posts')
    .get(postController.get_pages_count);
  app.route('/api/posts/:page')
    .get(postController.get_all_posts);

  // Post
  app.route('/api/post/:postId')
    .get(postController.get_post_by_id);
};
