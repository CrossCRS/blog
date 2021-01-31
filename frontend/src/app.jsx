import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';

import PostsView from './components/PostsView';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <PostsView />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
