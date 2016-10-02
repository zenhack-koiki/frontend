import React, {Component, PropTypes} from 'react';

export default class Spots extends Component {
  static propTypes = {
    recommends: PropTypes.array.isRequired,
  };

  render() {
    const {recommends} = this.props;
    const styles = require('../css/spots.less');

    return (
      <section className={'article ' + styles.spots} id="article">
      	<div className="gridmaster-result">
          {recommends.map(item =>
            <div
              key={item.spot + item.distance}
              className="grid-result">
              <a
                target="_blank"
                href={'https://www.google.co.jp/maps/' + (item.spot ? 'search' : 'place' ) + '/' + encodeURIComponent(item.spot || '') + '/@' + item.latitude + ',' + item.longitude + ',17z/'} >
                <p className="article1">
                    <span className="article-title">{item.distance}km</span>
                    <br />
                    {item.spot}<br />
                </p>
                <img src={item.url} />
                <p className="go-to-article">
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
