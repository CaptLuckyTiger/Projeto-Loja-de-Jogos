const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(String(email || '').trim());
}

export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= MIN_PASSWORD_LENGTH;
}

// Hash local via Web Crypto (SHA-256). Isto evita guardar a senha em texto puro
// no localStorage, mas não substitui autenticação real de um backend: qualquer
// pessoa com acesso ao navegador ainda consegue ler o hash e os dados salvos.
export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
