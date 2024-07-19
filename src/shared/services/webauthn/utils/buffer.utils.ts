const lookup = new Uint8Array(256);
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

for (let i = 0; i < chars.length; i++) {
  lookup[chars.charCodeAt(i)] = i;
}

export const bufferToBase64 = function (arraybuffer: ArrayBuffer) {
  const bytes = new Uint8Array(arraybuffer);

  let i;
  let len = bytes.length;
  let base64url = '';

  for (i = 0; i < len; i += 3) {
    base64url += chars[bytes[i] >> 2];
    base64url += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
    base64url += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
    base64url += chars[bytes[i + 2] & 63];
  }

  if ((len % 3) === 2) {
    base64url = base64url.substring(0, base64url.length - 1);
  } else if (len % 3 === 1) {
    base64url = base64url.substring(0, base64url.length - 2);
  }

  return base64url;
}

export function decodeBase64Url(base64UrlString: string) {
  // Replace URL-safe characters with Base64 standard characters
  const base64 = base64UrlString.replace(/-/g, '+').replace(/_/g, '/');
  // Decode the Base64 string
  const bytes = window.atob(base64);
  // Convert the binary string to a Uint8Array
  const len = bytes.length;
  const buffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buffer[i] = bytes.charCodeAt(i);
  }
  return buffer;
}

