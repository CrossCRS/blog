/* eslint-disable react/no-danger */
import React from 'react';
import { useParams } from 'react-router-dom';

import PostsListPage from './PostsListPage';

function UserPostsListPage() {
  const { username } = useParams();

  return (
    <PostsListPage user={username} />
  );
}

export default UserPostsListPage;
