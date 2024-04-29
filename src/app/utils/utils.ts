export function setCookie(cookieValue: string): void {
  document.cookie = 'currentUserId=' + cookieValue + ';';
}

export function deleteCookie(): void {
  document.cookie =
    'currentUserId=; expires=Mon, 28 Apr 2024 00:00:00 UTC; path=/;';
}
