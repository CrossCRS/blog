import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Layout';

import PostsView from './PostsView';

function MainRoute() {
  return (
    <Layout>
      <Switch>
        <Route path="/page/:pageId" component={PostsView} />
        <Route path="/" component={PostsView} />
      </Switch>
    </Layout>
  );
}

export default MainRoute;
