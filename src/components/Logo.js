import React, {Component, PropTypes} from 'react';

export default class Logo extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
  };

  render() {
    const {
      image,
    } = this.props;

    return (
      <div className="logo-spot">
        <img src={image} />
      </div>
    );
  }
}
