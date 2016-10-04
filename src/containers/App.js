import React, {Component, PropTypes} from 'react';
import {ApiClient} from 'koiki';
import uris from '../uris';
import Fetcher from 'redux-fetch-dispatcher';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { set } from '../reducers/sessions';
import uuid from 'uuid';
import Helmet from 'react-helmet';
import config from '../config';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    dispatch(set(uuid.v4()));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    i18n: state.i18n
  }),
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
    i18n: PropTypes.object.isRequired
  };

  static childContextTypes = {
    fetcher: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    i18n: PropTypes.object.isRequired
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
      lang: this.props.params.lang,
      i18n: this.props.i18n.msg,
    };
  }

  render() {
    return (
      <div>
        {this.props.children}
        <Helmet {...config.app.head} title="Find your memorable place" />
      </div>
    );
  }
}
