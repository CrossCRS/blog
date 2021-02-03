import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostPreview from './PostPreview';
import PostPreviewSkeleton from './PostPreviewSkeleton';

import axiosInstance from './api/axiosInstance';

function PostsView() {
  const { pageId } = useParams();

  const [posts, setPosts] = useState([]);
  const [currentPage/* , setCurrentPage */] = useState(pageId || 1);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/posts/${currentPage}`)
      .then((response) => {
        setPosts(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
        setHasError(true);
      });
  }, [currentPage]);

  if (hasError) {
    return (
      <h4 className="font-medium text-gray-500 text-xl text-center my-16">Could not load posts.</h4>
    );
  }

  if (isFetching) {
    return (
      <div>
        {Array.from({ length: 5 }, (_, k) => <PostPreviewSkeleton key={k} />)}
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => <PostPreview key={post._id} post={post} />)}
    </div>
  );
}

export default PostsView;
