import React from 'react';
import {Route, IndexRoute} from 'react-router';
import uris from './uris';
import {
    App,
    Home,
    NotFound
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path={uris.pages.root} component={App} >
      <IndexRoute component={Home} />
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
