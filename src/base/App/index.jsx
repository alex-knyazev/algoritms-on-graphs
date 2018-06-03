import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from '@/constants/routes';

import Lab1 from '@/pages/Lab1';
import Lab2 from '@/pages/Lab2';
import Lab3 from '@/pages/Lab3';
import Lab4 from '@/pages/Lab4';
import Layout from '../Layout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path={routes.LAB1} component={Lab1} />
          <Route exact path={routes.LAB2} component={Lab2} />
          <Route exact path={routes.LAB3} component={Lab3} />
          <Route exact path={routes.LAB4} component={Lab4} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
