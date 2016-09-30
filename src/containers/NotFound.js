import React, {Component} from 'react';

export default class NotFound extends Component {
  render() {
    const styles = require('../css/notfound.less');
    return (
      <div className={styles.notfound} >
        <article>
          <h1>Doh! 404!</h1>
          <hr/>
          <p>These are <em>not</em> the droids you are looking for!</p>
        </article>
      </div>
    );
  }
}
