import React from 'react';
import {
  Router,
  browserHistory,
  Route,
  IndexRoute,
} from 'react-router';
import Page from './page';

export default <Router history={browserHistory}>
  <Route path="/">
    <IndexRoute component={Page} />
    <Route path='/:name' component={Page} />
  </Route>
</Router>;
