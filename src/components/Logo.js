import React, {Component, PropTypes} from 'react';

export default class Logo extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
  };

  render() {
    const {
      image,
    } = this.props;
    const styles = require('../css/logo.less');
    return (
      <div className={styles.logo}>
        <img src={image} />
      </div>
    );
  }
}
