import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Photos as PhotosComponent
} from 'components';

@connect(
  (state)=>({
    images: state.images.items,
    index: state.images.index
  }),
  (/*dispatch*/) => ({
    like: (fetcher, values) => {
      fetcher.likes.select({
        values
      });
    }
  })
)
export default class Photos extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    select: PropTypes.func.isRequired
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired
  };

  render() {
    const {
      images,
      index,
      select
    } = this.props;
    return (
      <div>
        <PhotosComponent
          images={images}
          index={index}
          onLike={
            values => select({
              ...values,
              isLike: true
            })
          }
          onDislike={
            values => select({
              ...values,
              isLike: false
            })
          }
        />
      </div>
    );
  }
}
