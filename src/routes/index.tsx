import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardGround from '../pages/Dashboard-ground';
import DashboardPoison from '../pages/Dashboard-poison';
import DashboardGhost from '../pages/Dashboard-ghost';
import DashboardFlying from '../pages/Dashboard-flying';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={DashboardGround} />
    <Route path="/poison" component={DashboardPoison} />
    <Route path="/ghost" component={DashboardGhost} />
    <Route path="/flying" component={DashboardFlying} />
  </Switch>
);

export default Routes;
