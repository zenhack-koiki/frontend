import React, {Component, PropTypes} from 'react';
import Swipeable from 'react-swipeable';

export default class Photos extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired
  };

  render() {
    const {
      images,
      index,
      onLike,
      onDislike
    } = this.props;
    const styles = require('../css/photos.less');

    return (
      <div className={styles.photos} >
        {
          images.map((image, _index) =>
            index < _index ?
              <Swipeable
                key={image.id}
                onSwipedLeft={
                  () => onLike({
                    image_id: image.id,
                    session_id: new Date().getTime()
                  })
                }
                onSwipedRight={
                  () => onDislike({
                    image_id: image.id,
                    session_id: new Date().getTime()
                  })
                }
              >
                <img
                  src={image.url}
                />
              </Swipeable> : ''
          )
        }
      </div>
    );
  }
}
