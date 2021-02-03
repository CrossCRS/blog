import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from '../Layout';
import ScrollToTop from '../utils/ScrollToTop';

import PostsListPage from '../../pages/PostsListPage';

function MainRoute() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/page/:pageId(\d+)" component={PostsListPage} />
        <Route path="/" component={PostsListPage} />
      </Switch>
    </Layout>
  );
}

export default MainRoute;
