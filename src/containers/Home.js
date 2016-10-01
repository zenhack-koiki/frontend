import React, {Component, PropTypes} from 'react';
import uris from '../uris';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {
  Signature
} from 'components';

@connect(
  state=>state,
  {
    push
  }
)
export default class Home extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
  };

  render() {
    const {fetcher, lang} = this.context;
    return (
      <div>
        <Signature
          lead="YOUR PLACE"
          sublead="- find your memorable place -"
          button="Search near place"
          image={require('../images/signature.png')}
          onClick={
            () => {
              navigator.geolocation.getCurrentPosition((pos) => {
                console.log(pos.coords);
                fetcher
                  .images
                  .load({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                  })
                  .then(
                    () => this.props.push(uris.normalize( uris.pages.photos, {lang} ))
                  );
              },
              err => console.log(err));
            }
          }
        />
      </div>
    );
  }
}
