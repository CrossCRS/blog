const createError = require('http-errors');
const Page = require('../models/page.model');

exports.get_all_pages = (req, res, next) => {
  const query = {};

  if (req.query.header !== undefined) {
    query.header = req.query.header;
  }
  if (req.query.footer !== undefined) {
    query.footer = req.query.footer;
  }

  Page.find(query)
    .select('_id name title header footer')
    .then((pages) => { res.send(pages); })
    .catch(next);
};

exports.get_page_by_name = (req, res, next) => {
  const { name } = req.params;

  Page.findOne({ name })
    .then((post) => {
      if (post == null) {
        next(createError(404, 'Post not found'));
      }
      res.send(post);
    })
    .catch(next);
};
