import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ellipsize from 'ellipsize';
import dateFormat from 'dateformat';

function PostPreview({ post, targetLength, allowFullLength }) {
  const content = allowFullLength ? post.content : ellipsize(post.content, targetLength); // TODO: Markdown support

  return (
    <div className="bg-white py-6 px-6 my-6 md:my-12 shadow-md border border-gray-200 rounded-md">
      <Link to={`/post/${post._id}`} className="font-medium text-2xl text-gray-900">{post.title}</Link>
      <div className="flex justify-between">
        <h6 className="font-light text-sm text-gray-500">Posted by <Link to={`/user/${post.author_id._id}`} className="font-regular">{post.author_id.name}</Link></h6>
        <h6 className="font-light text-sm text-gray-500">{dateFormat(post.posted_at, 'mmmm dS, yyyy')}</h6>
      </div>
      <p className="text-gray-600 my-4">{content}</p>
      <Link to={`/post/${post._id}`} className="font-medium text-green-600">Read more</Link>
    </div>
  );
}

PostPreview.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author_id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    posted_at: PropTypes.string.isRequired,
  }).isRequired,

  targetLength: PropTypes.number,
  allowFullLength: PropTypes.bool,
};

PostPreview.defaultProps = {
  targetLength: 220,
  allowFullLength: false,
};

export default PostPreview;
