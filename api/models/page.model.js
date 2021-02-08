const mongoose = require('mongoose');

const { Schema } = mongoose;

const pageSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  header: {
    type: Boolean,
    required: false,
    default: false,
  },
  footer: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;
