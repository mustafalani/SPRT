import React, { Component } from 'react';
import CookiesHelper from '../utils/CookiesHelper';
import jwt_decode from "jwt-decode";

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (CookiesHelper.getCookie('access_token')) {
        const now = Date.now()
        const access_token = CookiesHelper.getCookie('access_token')
        const decoded_access_token = jwt_decode(access_token);
        if (Date.now()/1000 < decoded_access_token.exp) {
          this.props.history.push("/");
        }
        else {
          this.props.history.push("/login");
        }
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return Authentication;
}
