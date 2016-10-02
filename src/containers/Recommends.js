import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Spots
} from 'components';

@connect(
  (state)=>({
    recommends: state.recommends.items
  }),
  {}
)
export default class Recommend extends Component {
  static propTypes = {
    recommends: PropTypes.array.isRequired
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired
  };


  render() {
    const {recommends} = this.props;
    return (
      <div>
        <Spots
          recommends={recommends}
        />
      </div>
    );
  }
}
