import React, {Component, PropTypes} from 'react';
import ApiClient from 'promise-apiclient';
import uris from '../uris';
import Fetcher from 'redux-fetch-dispatcher';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { set } from '../modules/sessions';
import uuid from 'uuid';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    dispatch(set(uuid.v4()));
    return Promise.all(promises);
  }
}])
@connect(
  state => state,
  dispatch => ({
    dispatch: (...args) => dispatch(...args)
  })
)
export default class App extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
    router: PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    fetcher: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
  };

  getChildContext() {
    const req = this.props.router ? this.props.router.req : undefined;
    return {
      fetcher: new Fetcher({
        urls: uris.resources,
        dispatch: this.props.dispatch,
        client: new ApiClient(req ? {
          cookie: req.get('cookie'),
          origin: uris.base,
          referer: uris.base
        } : undefined)
      }),
      lang: this.props.params.lang
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
