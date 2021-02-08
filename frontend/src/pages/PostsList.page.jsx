import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import PostPreview from '../components/PostPreview';
import PostPreviewSkeleton from '../components/PostPreviewSkeleton';

import Pagination from '../components/SimplePagination';

import axiosInstance from '../components/api/axiosInstance';

const POSTS_LIMIT = 5;

function PostsListPage({ user }) {
  const { pageId = 1 } = useParams();

  const [pageCount, setPageCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const url = user ? `/users/${user}/posts?skip=${(pageId - 1) * POSTS_LIMIT}&limit=${POSTS_LIMIT}`
      : `/posts?skip=${(pageId - 1) * POSTS_LIMIT}&limit=${POSTS_LIMIT}`;

    axiosInstance.get(url)
      .then((response) => {
        if (!response.error) {
          setPageCount(Math.ceil(response.data.size / POSTS_LIMIT, 10));
          setPosts(response.data.posts);
        } else {
          setHasError(true);
        }
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
        setHasError(true);
      });
  }, [pageId, user]);

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
      <Pagination currentPage={parseInt(pageId, 10)} pageCount={pageCount} path={user ? `/author/${user}/` : '/page/'} />
    </div>
  );
}

PostsListPage.propTypes = {
  user: PropTypes.string,
};

PostsListPage.defaultProps = {
  user: null,
};

export default PostsListPage;
