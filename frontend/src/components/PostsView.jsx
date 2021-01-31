import React, { useState, useEffect } from 'react';

import PostPreview from './PostPreview';
import PostPreviewSkeleton from './PostPreviewSkeleton';

const POSTS_SERVICE_URL = 'http://localhost:9000/api/posts';

function PostsView() {
  const [posts, setPosts] = useState([]);
  const [currentPage/* , setCurrentPage */] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

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
      });
  }, [currentPage]);

  if (isFetching) {
    return (
      <div>
        {Array.from({ length: 5 }, () => (
          <PostPreviewSkeleton />
        ))}
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => <PostPreview post={post} />)}
    </div>
  );
}

export default PostsView;
