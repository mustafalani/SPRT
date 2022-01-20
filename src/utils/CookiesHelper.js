import Cookies from 'universal-cookie';

const COOKIES_MAX_AGE = 365 * 24 * 60 * 60;

class CookiesHelper {
  constructor() {
    this.cookies = new Cookies();
  }

  setCookie = (key, value) => {
    this.cookies.set(key, value, { path: '/', maxAge: COOKIES_MAX_AGE });
  };

  getCookie = key => {
    return this.cookies.get(key, { path: '/' });
  };

  removeCookie = key => {
    this.cookies.remove(key, { path: '/' });
  };
}

export default new CookiesHelper();
