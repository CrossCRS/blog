import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainRoute from './components/routes/MainRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={MainRoute} />
        {/* TODO: Admin route */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
