import React, {Component, PropTypes} from 'react';
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
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    return (
      <div>
        {this.props.children}
        <Helmet {...config.app.head} title="Find your memorable place" />
      </div>
    );
  }
}
