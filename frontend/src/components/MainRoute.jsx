import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout';
import ScrollToTop from './utils/ScrollToTop';

import PostsView from './PostsView';

function MainRoute() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/page/:pageId(\d+)" component={PostsView} />
        <Route path="/" component={PostsView} />
      </Switch>
    </Layout>
  );
}

export default MainRoute;
