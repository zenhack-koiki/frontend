import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-connect';
import {
  Form
} from 'components';


@asyncConnect([{
  promise: ({helpers: {fetcher}}) => {
    const promises = [];
    promises.push(
      fetcher.fruits.load()
    );
    return Promise.all(promises);
  }
}])
@connect(
  (state)=>({
    fruits: state.fruits.items
  }),
  (/*dispatch*/) => ({
    search: (fetcher, values) => {
      fetcher.fruits.load({
        values
      });
    }
  })
)
export default class Home extends Component {
  static propTypes = {
    fruits: PropTypes.array.isRequired,
    search: PropTypes.func.isRequired,
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired
  };

  render() {
    const {
      fruits,
      search
    } = this.props;
    return (
      <div>
        <p>aha</p>
        <Form
          initialValues={
            fruits
          }
          onEnter={
            values => search(this.context.fetcher, values)
          }
        />
      </div>
    );
  }
}
