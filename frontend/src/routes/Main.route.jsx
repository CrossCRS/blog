import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import ScrollToTop from '../components/utils/ScrollToTop';

import PostPage from '../pages/Post.page';
import PostsListPage from '../pages/PostsList.page';
import UserPostsListPage from '../pages/UserPostsList.page';
import CustomPagePage from '../pages/CustomPage.page';

function MainRoute() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/page/:pageId(\d+)" component={PostsListPage} />

        <Route path="/author/:username/:pageId(\d+)" component={UserPostsListPage} />
        <Route path="/author/:username" component={UserPostsListPage} />

        <Route path="/:postId([0-9a-fA-F]{24})" component={PostPage} />

        <Route path="/:pageName" component={CustomPagePage} />

        <Route path="/" component={PostsListPage} />
      </Switch>
    </Layout>
  );
}

export default MainRoute;
