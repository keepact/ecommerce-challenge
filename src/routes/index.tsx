import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Cart from '../pages/mobile/Cart';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Main} />
    <Route path="/cart" component={Cart} />
  </Switch>
);

export default Routes;
