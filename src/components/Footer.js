import React, {Component} from 'react';

export default class Header extends Component {

  render() {
    const styles = require('../css/footer.less');
    return (
      <div className={styles.place}>
      	<p>Kamakura, Kanagawa</p>
      </div>
    );
  }
}
