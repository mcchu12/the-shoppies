import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './Layout';

const Home = () => {
  return <div>Home</div>;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/" component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Routes;
