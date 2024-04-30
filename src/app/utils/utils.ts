export function setCookie(cookieName: string, cookieValue: string): void {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + 12 * 60 * 60 * 1000).toString();
  const cookieExpiration = 'expires=' + currentDate.toUTCString();
  document.cookie =
    cookieName + '=' + cookieValue + ';' + cookieExpiration + ';path=/';
}

export function deleteCookie(cookieName: string): void {
  document.cookie = `${cookieName}=; expires=Mon, 28 Apr 2024 00:00:00 UTC; path=/;`;
}

export function getCookie(cookieName: string) {
  const cookie = decodeURIComponent(document.cookie);
  const cookieSections = cookie.split(';');
  let cookieValue = '';
  for (let i = 0; i < cookieSections.length; i++) {
    const cookie = cookieSections[i].replace(' ', '');
    if (cookie.indexOf(cookieName) === 0) {
      cookieValue = cookie;
      cookieValue = cookieValue.substring(
        cookieValue.indexOf(`=`) + 1,
        cookieValue.length,
      );
    }
  }
  return cookieValue;
}
