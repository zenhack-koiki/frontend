import React, {Component, PropTypes} from 'react';
import uris from '../uris';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { load, set } from '../modules/location';
import {
  Signature,
  Logo,
  Loading
} from 'components';

@connect(
  state=> ({
    locationLoading: state.location.loading,
    loading: state.images.loading
  }),
  dispatch => ({
    setLocation: (coords) => dispatch(set(coords)),
    load: () => dispatch(load()),
    push: (url) => dispatch(push(url))
  })
)
export default class Home extends Component {
  static propTypes = {
    setLocation: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    locationLoading: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  };

  static contextTypes = {
    fetcher: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired
  };

  render() {
    const {loading, locationLoading} = this.props;
    const {fetcher, lang} = this.context;
    return (
      <div className="home" >
        <Signature
          sublead="- find your memorable place -"
          button="Search near place"
          onClick={
            () => {
              this.props.load();
              navigator.geolocation.getCurrentPosition((pos) => {
                fetcher
                  .images
                  .load({
                    latitude: Number(pos.coords.latitude),
                    longitude: Number(pos.coords.longitude)
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
        {
          loading || locationLoading ? <Loading /> : ''
        }
      </div>
    );
  }
}
