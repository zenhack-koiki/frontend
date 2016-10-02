import React, {Component, PropTypes} from 'react';

export default class Signature extends Component {
  static propTypes = {
    sublead: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const {
      sublead,
      button,
      onClick
    } = this.props;
    const styles = require('../css/signature.less');

    return (
      <header
        className={'header ' + styles.header}
      >
        <div className={styles.composer}>
        	<p className={'site-description ' + styles.description}>{sublead}</p>
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
            {button}</a>
        	</div>
        </div>
      </header>
    );
  }
}
