import React from 'react';
import {Route, IndexRoute} from 'react-router';
import uris from './uris';
import {
    App,
    Home,
    Photos,
    Recommends,
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
      <Route path={uris.pages.photos} component={Photos} status={404} />
      <Route path={uris.pages.recommends} component={Recommends} status={404} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
