import React, {Component, PropTypes} from 'react';

export default class Spots extends Component {
  static propTypes = {
    recommends: PropTypes.array.isRequired,
  };

  render() {
    const {recommends} = this.props;
    const styles = require('../css/spots.less');

    return (
      <section className={styles.spots} >
      	<div className={styles.gridmaster} >
          {recommends.map(item =>
            <div
              key={item.spot + item.distance}
              className={styles.grid}>
              <a
                target="_blank"
                href={'https://www.google.co.jp/maps/' + (item.spot ? 'search' : 'place' ) + '/' + encodeURIComponent(item.spot || '') + '/@' + item.latitude + ',' + item.longitude + ',17z/'} >
                <p className={styles.article}>
                    <span className={styles.title}>{item.distance}km</span>
                    <br />
                    {item.spot}<br />
                </p>
                <img src={item.url} />
                <p className={styles.goto}>
                  <i className="fa fa-arrow-circle-right" aria-hidden="true"></i> MAP
                </p>
              </a>
            </div>
          )}
    		</div>
      </section>
    );
  }
}
