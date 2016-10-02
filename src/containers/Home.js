import React, {Component, PropTypes} from 'react';
import uris from '../uris';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { set } from '../modules/location';
import {
  Signature,
  Logo
} from 'components';

@connect(
  state=>state,
  dispatch => ({
    setLocation: (coords) => dispatch(set(coords)),
    push: (url) => dispatch(push(url))
  })
)
export default class Home extends Component {
  static propTypes = {
    setLocation: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
  };

  render() {
    const {fetcher, lang} = this.context;
    return (
      <div className="home" >
        <Signature
          sublead="- find your memorable place -"
          button="Search near place"
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
                    () => {
                      this.props.setLocation(pos.coords);
                      this.props.push(uris.normalize( uris.pages.photos, {lang} ));
                    }
                  );
              },
              err => console.log(err));
            }
          }
        />
      <Logo
        image={require('../images/spot4u.png')}
      />
      </div>
    );
  }
}
