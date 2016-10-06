import React, {Component, PropTypes} from 'react';

export default class Signature extends Component {
  static propTypes = {
    lead: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const {
      lead,
      button,
      onClick
    } = this.props;
    const styles = require('../css/signature.less');

    return (
      <header className={styles.header} >
        <div className={styles.composer}>
        	<p className={styles.description}>{lead}</p>
        	<div>
        		<a
              className={styles.button}
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
