import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardWater from '../pages/Dashboard-water';
import DashboardDragon from '../pages/Dashboard-dragon';
import DashboardFire from '../pages/Dashboard-fire';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={DashboardWater} />
    <Route path="/dragon" component={DashboardDragon} />
    <Route path="/fire" component={DashboardFire} />
  </Switch>
);

export default Routes;
