import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainRoute from './routes/Main.route';

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
