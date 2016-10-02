import React, {Component} from 'react';

export default class Loading extends Component {

  render() {
    const styles = require('../css/loading.less');

    return (
      <div className={styles.loading}>
        <img src={require('../images/box.gif')} />
      </div>
    );
  }
}
