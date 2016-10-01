import React, {Component, PropTypes} from 'react';
import Swipeable from 'react-swipeable';

export default class Photos extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired
  };
  state = {
    index: 0
  };

  render() {
    const {
      images,
      onLike,
      onDislike,
      onFinish
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
        image_id: String(image.id)
      });
    };

    const left = image => {
      this.setState({
        index: this.state.index + 1,
        className: 'nope'
      });
      onDislike({
        image_id: String(image.id)
      });
    };
    const up = () => {
      onFinish();
    };
    const styles = require('../css/photos.less');
    console.log(images);

    return (
      <div className={styles.container} >
        {
          images.filter((image, _index) => index - 1 <= _index)
                .map((image, _index) => {
                  if ( _index === 0 ) {
                    image.first = true;
                  }
                  return image;
                })
                .map((image, _index) =>
                  <Swipeable
                    key={image.id}
                    onSwipedLeft={
                      () => left(image)
                    }
                    onSwipedRight={
                      () => right(image)
                    }
                    onSwipedUp={
                      () => up()
                    }
                    className={
                      'flick ' +
                      styles.flick + ' ' +
                      (_index === 0 ? styles[this.state.className] : '') + ' ' +
                      (image.first ? styles.first : '' )
                    }
                    style={{
                      backgroundImage: 'url(' + image.url + ')',
                      zIndex: images.length - _index
                    }}
                  />
          )
        }
      </div>
    );
  }
}
