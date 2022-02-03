import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import CookiesHelper from '../utils/CookiesHelper';
const email = CookiesHelper.getCookie('email')

const logout = (e) => {
        CookiesHelper.removeCookie('user_id');
        CookiesHelper.removeCookie('access_token');
        CookiesHelper.removeCookie('refresh_token');
        CookiesHelper.removeCookie('email');
        CookiesHelper.removeCookie('encryptedPassword');
        window.location.href = '/';
    }
const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div><CIcon name="cil-user" className="mfe-2" />{email}</div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon name="cil-account-logout" className="mfe-2" />
          <a onClick={e => logout()}>LOGOUT</a>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
