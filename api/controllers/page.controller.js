const createError = require('http-errors');
const { body, validationResult } = require('express-validator');
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
    .then((page) => {
      if (page == null) {
        next(createError(404, 'Page not found'));
      }
      res.send(page);
    })
    .catch(next);
};

exports.add_page = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(422, 'Invalid payload'));
  }

  const page = {
    name: req.params.name,
    title: req.body.title,
    content: req.body.content,
  };

  if (req.body.header) page.header = req.body.header;
  if (req.body.footer) page.footer = req.body.footer;

  Page.create(page)
    .then((_page) => {
      res.send(_page);
    }).catch((next));
};

exports.update_page = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(createError(422, 'Invalid payload'));
  }

  const { name } = req.params;

  const update = {};

  if (req.body.name) update.name = req.body.name;
  if (req.body.title) update.title = req.body.title;
  if (req.body.content) update.content = req.body.content;
  if (req.body.header) update.header = req.body.header;
  if (req.body.footer) update.footer = req.body.footer;

  Page.findOneAndUpdate({ name }, update, { new: true }) // Set new to true so that the returned document is the modified document
    .then((page) => {
      if (page == null) {
        next(createError(404, 'Page not found'));
      }
      res.send(page);
    }).catch(next);
};

exports.delete_page = (req, res, next) => {
  const { name } = req.params;

  Page.findOneAndDelete({ name })
    .then((page) => {
      if (page == null) {
        next(createError(404, 'Page not found'));
      }
      res.send({ message: 'Page deleted' });
    }).catch(next);
};

exports.validate = (method) => {
  switch (method) {
    case 'add_page': {
      return [
        body('title').exists().isString(),
        body('content').exists().isString(),
        body('header').optional().isBoolean(),
        body('footer').optional().isBoolean(),
      ];
    }
    case 'update_page': {
      return [
        body('title').optional().isString(),
        body('content').optional().isString(),
        body('header').optional().isBoolean(),
        body('footer').optional().isBoolean(),
      ];
    }
  }
  return [];
};
