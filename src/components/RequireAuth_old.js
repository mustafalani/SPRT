import React, { Component } from 'react';
import CookiesHelper from '../utils/CookiesHelper';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!CookiesHelper.getCookie('access_token')) {
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return Authentication;
}
