import React, {Component, PropTypes} from 'react';

export default class Signature extends Component {
  static propTypes = {
    lead: PropTypes.string.isRequired,
    sublead: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const {
      lead,
      sublead,
      image,
      onClick
    } = this.props;

    return (
      <header
        className="header"
        style={{
          backgroundImage: 'url(' + image + ')'
        }}>
      	<h2 className="site-title">{lead}</h2>
      	<p className="site-description">{sublead}</p>
      	<div className="buttons">
      		<a
            className="button"
            href="#"
            onClick={
              evt => {
                evt.preventDefault();
                onClick();
              }
            }>
          >Search near place</a>
      	</div>
      </header>
    );
  }
}
