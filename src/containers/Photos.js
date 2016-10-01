import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Footer,
  Photos as PhotosComponent
} from 'components';

@connect(
  (state)=>({
    images: state.images.items,
    session: state.sessions.id
  }),
  (/*dispatch*/) => ({
    select: (fetcher, values) => {
      fetcher.likes.select(values);
    }
  })
)
export default class Photos extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
    session: PropTypes.string.isRequired
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired
  };


  render() {
    const {fetcher} = this.context;
    const {
      images,
      select,
      session
    } = this.props;
    console.log(images);

    return (
      <div>
        <PhotosComponent
          images={images}
          onLike={
            values => select(
              fetcher,
              {
                ...values,
                session_id: session,
                is_like: true
              }
            )
          }
          onDislike={
            values => select(
              fetcher,
              {
                ...values,
                session_id: session,
                is_like: false
              }
            )
          }
        />
        <Footer />
      </div>
    );
  }
}
