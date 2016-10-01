import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import uris from '../uris';
import {
  Footer,
  Photos as PhotosComponent
} from 'components';
import { push } from 'react-router-redux';

@connect(
  (state)=>({
    images: state.images.items,
    session: state.sessions.id,
    location: state.location
  }),
  dispatch => ({
    select: (fetcher, values) => {
      fetcher.likes.select(values);
    },
    recommend: (fetcher, values, lang) => {
      fetcher
      .recommends
      .load(values)
      .then(
        () => dispatch(push(uris.normalize(uris.pages.recommends, {lang})))
      );
    }
  })
)
export default class Photos extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
    recommend: PropTypes.func.isRequired,
    session: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
  };


  render() {
    const {fetcher, lang} = this.context;
    const {
      images,
      select,
      location,
      recommend,
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
          onFinish={
            () => recommend(
              fetcher,
              {
                session_id: session,
                latitude: location.latitude,
                longitude: location.longitude
              },
              lang
            )
          }
        />
        <Footer />
      </div>
    );
  }
}
