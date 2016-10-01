import React, {Component, PropTypes} from 'react';
import uris from '../uris';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { push } from 'react-router-redux';
import { set } from '../modules/sessions';
import uuid from 'uuid';
import {
  Signature
} from 'components';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    dispatch(set(uuid.v4()));
    return Promise.all(promises);
  }
}])
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
