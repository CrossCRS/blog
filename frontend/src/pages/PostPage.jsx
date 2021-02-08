/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import DOMPurify from 'dompurify';
import marked from 'marked';
import dateFormat from 'dateformat';

import PostPreviewSkeleton from '../components/PostPreviewSkeleton';
import axiosInstance from '../components/api/axiosInstance';

function PostPage() {
  const { postId } = useParams();

  const [post, setPost] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/posts/${postId}`)
      .then((response) => {
        if (!response.error) {
          response.data.content = DOMPurify.sanitize(marked(response.data.content));
          setPost(response.data);
          setHasError(false);
        } else {
          setHasError(true);
        }
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
        setIsFetching(false);
      });
  }, [postId]);

  if (hasError) {
    return (
      <h4 className="font-medium text-gray-500 text-xl text-center my-16">Could not load post</h4>
    );
  }

  if (isFetching) {
    return (
      <div>
        <PostPreviewSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white py-6 px-6 my-6 md:my-12 shadow-md border border-gray-200 rounded-md">
      <h2 className="my-0 font-medium text-2xl text-gray-900">{post.title}</h2>
      <div className="flex justify-between">
        <span className="font-light text-sm text-gray-500">Posted by <Link to={`/author/${post.author_id.username}`} className="font-regular">{post.author_id.display_name}</Link></span>
        <span className="font-light text-sm text-gray-500">{dateFormat(post.posted_at, 'mmmm dS, yyyy')}</span>
      </div>
      <p className="text-gray-600 my-4" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export default PostPage;
