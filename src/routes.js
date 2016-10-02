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

export default store => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path={uris.pages.root} component={App} >
      <IndexRoute component={Home} />
      { /* Catch all route */ }
      <Route path={uris.pages.photos} component={Photos} onEnter={
        (next, replace, cb) => {
          const state = store.getState();
          if ( !state.images ||
               !state.images.loaded ) {
            replace(uris.pages.defaults);
          }
          cb();
        }
      }/>
      <Route path={uris.pages.recommends} component={Recommends} onEnter={
        (next, replace, cb) => {
          const state = store.getState();
          if ( !state.recommends ||
               !state.recommends.loaded ) {
            replace(uris.pages.defaults);
          }
          cb();
        }
      }
      />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
