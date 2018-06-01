import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from '@/constants/routes';

import Lab1 from '@/pages/Lab1';
import Lab2 from '@/pages/Lab2';
import Layout from '../Layout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={routes.LAB1} component={Lab1} />
          <Route exact path={routes.LAB2} component={Lab2} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
