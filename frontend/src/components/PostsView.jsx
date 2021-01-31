import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PostPreview from './PostPreview';
import PostPreviewSkeleton from './PostPreviewSkeleton';

const POSTS_SERVICE_URL = 'http://localhost:9000/api/posts';

function PostsView() {
  const { pageId } = useParams();

  const [posts, setPosts] = useState([]);
  const [currentPage/* , setCurrentPage */] = useState(pageId || 1);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(`${POSTS_SERVICE_URL}/${currentPage}`)
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
        setIsFetching(false);
      })
      .catch((e) => {
        console.log(e);
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
