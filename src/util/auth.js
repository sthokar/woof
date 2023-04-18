import { redirect } from 'react-router-dom';

export function getAuthCookieDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthCookie() {
  const authCookie = localStorage.getItem('expiration');

  if (!authCookie) {
    return null;
  }

  const authCookieDuration = getAuthCookieDuration();

  if (authCookieDuration < 0) {
    return 'EXPIRED';
  }

  return authCookie;
}

export function authCookieLoader() {
  const authCookie = getAuthCookie();
  return authCookie;
}

export function checkAuthLoader() {
  const authCookie = getAuthCookie();

  if (!authCookie) {
    return redirect('/login');
  }
  return authCookie;

}