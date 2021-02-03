import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostPreview from '../components/PostPreview';
import PostPreviewSkeleton from '../components/PostPreviewSkeleton';

import Pagination from '../components/SimplePagination';

import axiosInstance from '../components/api/axiosInstance';

function PostsView() {
  const { pageId = 1 } = useParams();

  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axiosInstance.get('/posts/')
      .then((response) => {
        setPageCount(parseInt(response.data.pages_count, 10));
      })
      .catch((error) => {
        console.log(error);
      });

    axiosInstance.get(`/posts/${pageId}`)
      .then((response) => {
        setPosts(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
        setHasError(true);
      });
  }, [pageId]);

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
      <Pagination currentPage={parseInt(pageId, 10)} pageCount={pageCount} />
    </div>
  );
}

export default PostsView;
