import React, {Component, PropTypes} from 'react';
import uris from '../uris';
import { IndexLink } from 'react-router';
import { stringify } from 'koiki';

export default class Header extends Component {

  static contextTypes = {
    lang: PropTypes.string.isRequired
  };

  render() {
    const {lang} = this.context;
    return (
      <div className="logo">
        <IndexLink
          to={stringify(uris.pages.root, {lang})}
        >
          <img src="/images/urplace.png" />
        </IndexLink>
      </div>
    );
  }
}
