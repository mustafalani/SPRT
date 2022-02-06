import React, { Component } from 'react';
import CookiesHelper from '../../../utils/CookiesHelper';
import CryptoJS from "crypto-js";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import MongoQueries from '../../../utils/api/mongoQueries';
import CIcon from '@coreui/icons-react'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    }
  }

  onChange = (field) => (event) => {
    this.setState({[field]: event.target.value, error: ''});
  }

  print = () => {
    console.log(this.state)
  }

  login = () => {
    const { username, password } = this.state;

    MongoQueries.authenticate(username, password).then(response => {
      if (response.status === 200) {
        return response.json().then(json => {
          const user_id = json.user_id;
          const access_token = json.access_token;
          const refresh_token = json.refresh_token;
          const encryptedPassword = CryptoJS.AES.encrypt(password, access_token).toString();
          CookiesHelper.setCookie('user_id', user_id);
          CookiesHelper.setCookie('access_token', access_token);
          CookiesHelper.setCookie('refresh_token', refresh_token);
          CookiesHelper.setCookie('email', username);
          CookiesHelper.setCookie('encryptedPassword', encryptedPassword);
          this.props.history.push('/');
        }
        );
      }
      else {
        this.setState({error: response.status});
        CookiesHelper.removeCookie('user_id')
        CookiesHelper.removeCookie('access_token')
        CookiesHelper.removeCookie('refresh_token')
        if (response.status === 401) {
          toast.error("Invalid username/password");
        }
        else {
          toast.error("Something went wrong!");
        }
      }
    })
  }

  render() {
  const { username, password } = this.state;

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="text-white bg-secondary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody>
                  <CForm>
                    <h1 style={{"textAlign": "center"}}>Welcome to SPRT Search</h1>
                    <p className="text-muted" style={{"textAlign": "center"}}>Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" id="username" placeholder="Username" autoComplete="username" value={username} onChange={this.onChange('username')} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" id="password" placeholder="Password" autoComplete="current-password" value={password} onChange={this.onChange('password')} />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" onClick={() => this.login()} className="px-4">Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
}

export default Login
