import React, {Component, PropTypes} from 'react';

export default class Spots extends Component {
  static propTypes = {
    results: PropTypes.array.isRequired,
  };

  render() {

    return (
      <section className="article" id="article">
      	<div className="gridmaster-result">
      		<div className="grid-result">
        		<a href="./article-streamer-coffee.html">
        			<p className="article1">
                  Cafe<br />
                  <span className="article-title">0.4km</span>
                  <br />
                  Kamakura<br />
              </p>
        			<img src="/images/tumbnail-streamer.jpg " />
        			<p className="go-to-article">
                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i> MAP
              </p>
        		</a>
          </div>
    		</div>
      </section>
    );
  }
}
