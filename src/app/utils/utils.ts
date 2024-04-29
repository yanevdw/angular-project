export function setCookie(cookieValue: string): void {
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + 12 * 60 * 60 * 1000).toString();
  const cookieExpiration = 'expires=' + currentDate.toUTCString();
  document.cookie =
    'currentUserId=' + cookieValue + ';' + cookieExpiration + ';path=/';
}

export function deleteCookie(): void {
  document.cookie =
    'currentUserId=; expires=Mon, 28 Apr 2024 00:00:00 UTC; path=/;';
}
