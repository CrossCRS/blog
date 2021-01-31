const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const User = require('./user.model'); // Require to create the User mongoose model

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  posted_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  content_short: String,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
