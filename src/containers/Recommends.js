import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Footer,
  Spots
} from 'components';

@connect(
  (state)=>({
    recommends: state.recommends.items
  }),
  (/*dispatch*/) => ({
    select: (fetcher, values) => {
      fetcher.likes.select(values);
    }
  })
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
        <Footer />
      </div>
    );
  }
}
