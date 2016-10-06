import React, {Component, PropTypes} from 'react';
import {
  Loading
} from 'components';
import Swipeable from 'react-swipeable';

export default class Photos extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };
  state = {
    index: 0,
    className: ''
  };

  render() {
    const {
      images,
      onLike,
      onDislike,
      onFinish,
      loading
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
      if ( this.state.index + 1 === images.length ) {
        onFinish();
      }
    };

    const left = image => {
      this.setState({
        index: this.state.index + 1,
        className: 'nope'
      });
      onDislike({
        image_id: String(image.id)
      });
      if ( this.state.index + 1 === images.length ) {
        onFinish();
      }

    };
    const up = () => {
      onFinish();
    };
    const styles = require('../css/photos.less');
    const leftarrow = require('../images/flick-left.svg');
    const rightarrow = require('../images/flick-right.svg');

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
                      styles.flick + ' ' +
                      (_index === 0 ? styles[this.state.className] : '') + ' ' +
                      (image.first ? styles.first : '' )
                    }
                    style={{
                      backgroundImage: 'url(' + image.url + ')',
                      zIndex: images.length - _index
                    }}
                  >
                    <div className={styles.nopearrow} >
                      <div className={styles.note}>
                        <img src={leftarrow} /><br />
                        <span>Nope</span>
                      </div>
                    </div>
                    <div className={styles.yayarrow} >
                      <div className={styles.note}>
                        <img src={rightarrow} /><br />
                        <span>Like</span>
                      </div>
                    </div>
                  </Swipeable>
          )
        }
        {
          this.state.className === 'yay' ?
            <div className={styles.yaynotify} >Like</div> :
          this.state.className === 'nope' ?
            <div className={styles.nopenotify}>nope</div> : ''
        }
        {
          loading ? <Loading /> : ''
        }
      </div>
    );
  }
}
