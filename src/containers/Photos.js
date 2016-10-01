import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
  Photos as PhotosComponent
} from 'components';

@connect(
  (state)=>({
    images: state.images.items,
    index: state.images.index,
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
    index: PropTypes.number.isRequired,
    select: PropTypes.func.isRequired,
    session: PropTypes.number.isRequired
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired
  };


  render() {
    const {fetcher} = this.context;
    const {
      images,
      index,
      select,
      session
    } = this.props;
    console.log(images, index);
    return (
      <div>
        <PhotosComponent
          images={[{
            id: 1,
            url: 'https://zenhack.herokuapp.com/dist/2952985136c354e0b5174a321731e1d1.png'
          },
          {
            id: 2,
            url: 'https://zenhack.herokuapp.com/dist/2952985136c354e0b5174a321731e1d1.png'
          }]}
          index={index}
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
      </div>
    );
  }
}
