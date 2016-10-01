import React, {Component, PropTypes} from 'react';
import Swipeable from 'react-swipeable';

export default class Photos extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired
  };
  state = {
    index: 0
  };

  render() {
    const {
      images,
      onLike,
      onDislike
    } = this.props;
    const {
      index
    } = this.state;

    const right = image => {
      this.setState({
        index: this.state.index + 1,
        className: 'yay'
      });
      onLike({
        image_id: image.id
      });
    };

    const left = image => {
      this.setState({
        index: this.state.index + 1,
        className: 'nope'
      });
      onDislike({
        image_id: image.id
      });
    };
    const styles = require('../css/photos.less');
    console.log(images);

    return (
      <div className={styles.container} >
        {
          images.map((image, _index) => console.log(image.url) ||
            index - 1 <= _index ?
              <Swipeable
                key={image.id}
                onSwipedLeft={
                  () => left(image)
                }
                onSwipedRight={
                  () => right(image)
                }
                className={
                  'flick ' +
                  styles.flick + ' ' +
                  (index - 1 === _index ? styles[this.state.className] : '') + ' ' +
                  (_index === 0 ? styles.first : '' )
                }
                style={{
                  backgroundImage: 'url(' + image.url + ')',
                  zIndex: images.length - _index
                }}
              /> : ''
          )
        }
      </div>
    );
  }
}
